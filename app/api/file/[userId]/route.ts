import csv from "csv-parser";
import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import Dataset from "@/models/Dataset";

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

export const GET = async (request: Request, { params: { userId } }: Props) => {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);

    const datasetId = searchParams.get("id");
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 404 });
    }

    const dataset = await Dataset.findById(datasetId);
    if (!dataset) {
      return NextResponse.json({ message: "Invalid request" }, { status: 404 });
    }

    if (dataset.addedBy != userId) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }

    const getObjectParams = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: dataset.key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const resp = await s3.send(command);
    const fileData: any = resp.Body;

    // Get the requested page number from the query string
    const page: number = parseInt(searchParams.get("page") || "1");

    // Number of records per page
    const pageSize = 100;

    const records: any[] = [];

    let start: number = (page - 1) * pageSize;
    let end = start + pageSize;

    await new Promise((resolve, reject) => {
      fileData
        .pipe(csv())
        .on("data", (row: any) => {
          records.push(row);
        })
        .on("end", () => {
          resolve(records);
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });

    const removedHeaders = dataset.headers
      .filter(
        // @ts-ignore
        (header) => header.isDisabled || header.isHidden
      )
      // @ts-ignore
      .map((header) => header.name);

    // Function to remove specified keys from each object
    // @ts-ignore
    function removeKeys(obj, keysToRemove) {
      keysToRemove.forEach((key: string) => delete obj[key]);
      return obj;
    }

    const totalPages = Math.ceil(records.length / pageSize);
    const paginatedRecords = records
      .slice(start, end)
      .map((obj) => removeKeys({ ...obj }, removedHeaders));
    const totalRecords = records.length;

    return NextResponse.json(
      {
        records: paginatedRecords,
        totalRecords: totalRecords,
        currentPage: page,
        totalPages: totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
