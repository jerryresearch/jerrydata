import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import csv from "csv-parser";
import { OpenAI } from "openai";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

type Props = {
  params: {
    userId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const datasets = await Dataset.find({ addedBy: userId }).sort("-createdAt");
    return NextResponse.json(datasets, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const { name, size, datatype, key } = await req.json();
    if (!name || !datatype || !size || !key) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }

    const getObjectParams = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const resp = await s3.send(command);
    const fileData: any = resp.Body;

    let headers: any[] = [];
    let rows: number = 0;

    await new Promise((resolve, reject) => {
      fileData
        .pipe(csv())
        .on("headers", (fileHeaders: any) => {
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
        .on("error", (error: any) => {
          reject(error);
        });
    });

    // openai file upload todo
    const dataset = await Dataset.create({
      name,
      key,
      datatype,
      // openAPIFile,
      size,
      rows,
      columns: headers.length,
      headers,
      addedBy: userId,
    });
    return NextResponse.json(
      { dataset, message: "Dataset added" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
