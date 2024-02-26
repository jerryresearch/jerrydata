import mongoose from "mongoose";
import Dataset from "@/models/Dataset";
import { connectToDB } from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import csv from "csv-parser";
import { Readable } from "stream";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Props = {
  params: {
    userId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// export const GET = async (req: Request, { params: { userId } }: Props) => {
//   try {
//     await connectToDB();
//     if (!userId || !mongoose.isValidObjectId(userId)) {
//       return NextResponse.json({ message: "Invalid session" }, { status: 403 });
//     }
//     const { searchParams } = new URL(req.url);

//     const getObjectParams = {
//       Bucket: process.env.NEXT_PUBLIC_AWS_FILES_BUCKET_NAME,
//       Key: searchParams.get("key") || "",
//     };
//     const command = new GetObjectCommand(getObjectParams);
//     const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });

//     return NextResponse.json({ url }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: error }, { status: 500 });
//   }
// };

// upload a new dataset
export const POST = async (req: Request, { params: { userId } }: Props) => {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    // get formdata from request
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const fileName = file.name.split(".")[0];
    const datatype = data.get("datatype");
    const size = file.size;

    // generate random file name to avoid replacing old file with same name
    const randomFileName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");

    const key = randomFileName();

    // get buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_FILES_BUCKET_NAME,
      Key: key,
      Body: buffer,
    };

    // upload to s3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    let headers: any[] = [];
    let rows: number = 0;

    await new Promise((resolve, reject) => {
      bufferStream
        .pipe(csv())
        .on("headers", (fileHeaders) => {
          headers = fileHeaders.map((header: string) => {
            return {
              name: header,
              datatype: "String",
              isDisabled: false,
            };
          });
        })
        .on("data", () => {
          rows += 1;
        })
        .on("end", () => {
          resolve(rows);
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    const openAPIFile = await openai.files.create({
      file: file,
      purpose: "assistants",
    });

    // store in database
    const dataset = await Dataset.create({
      name: fileName,
      key,
      datatype,
      openAPIFile,
      size,
      rows,
      columns: headers.length,
      headers,
      addedBy: userId,
    });
    return NextResponse.json(dataset, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
