import mongoose from "mongoose";
import Dataset from "@/models/Dataset";
import { connectToDB } from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  // GetObjectCommand,
} from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

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
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
//       Bucket: process.env.AWS_FILES_BUCKET_NAME,
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

    // generate random file name to avoid replacing old file with same name
    const randomFileName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");

    const key = randomFileName();

    // get buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const params = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: key,
      Body: buffer,
    };

    // upload to s3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    // store in database
    const dataset = await Dataset.create({
      name: fileName,
      key,
      datatype,
      addedBy: userId,
    });
    return NextResponse.json(dataset, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
