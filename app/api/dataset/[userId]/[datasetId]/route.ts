import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import Dataset from "@/models/Dataset";
import { OpenAI } from "openai";

type Props = {
  params: {
    userId: string;
    datasetId: string;
  };
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const dataset = await Dataset.findOne({ _id: datasetId, addedBy: userId });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(dataset, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const dataset = await Dataset.findOne({ _id: datasetId, addedBy: userId });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }
    const updatedDataset = await Dataset.findByIdAndUpdate(datasetId, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedDataset, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const dataset = await Dataset.findOne({ _id: datasetId, addedBy: userId });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }

    // create a s3 client
    // @ts-ignore
    const s3 = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: dataset.key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    await openai.files.del(dataset.openAPIFile.id);

    await Dataset.findByIdAndDelete(datasetId);
    return NextResponse.json(
      { message: `dataset ${dataset.name} deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
