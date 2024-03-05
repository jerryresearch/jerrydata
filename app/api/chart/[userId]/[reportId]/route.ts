export const maxDuration = 300;

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/mongoose";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import csv from "csv-parser";
import Chart from "@/models/Chart";
import Dataset from "@/models/Dataset";
import Report from "@/models/Report";

type Props = {
  params: {
    userId: string;
    reportId: string;
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

export async function GET(
  req: Request,
  { params: { userId, reportId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    // @ts-ignore
    const charts = await Chart.find({
      createdBy: userId,
      report: reportId,
    }).sort("-createdAt");
    return NextResponse.json(charts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId, reportId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid report" }, { status: 403 });
    }
    const { title, chartType, dataset, xAxis, yAxis, report } =
      await req.json();
    if (!title || !chartType || !dataset || !xAxis || !yAxis || !report) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }
    if (!dataset || !mongoose.isValidObjectId(dataset)) {
      return NextResponse.json(
        { message: "Invalid request, dataset does not exist" },
        { status: 403 }
      );
    }

    const datasetObj = await Dataset.findById(dataset);
    if (!datasetObj) {
      return NextResponse.json({ message: "Invalid request" }, { status: 404 });
    }

    const getObjectParams = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: datasetObj.key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const resp = await s3.send(command);
    const fileData: any = resp.Body;

    let xData: any[] = [];
    let yData: any[] = [];

    await new Promise((resolve, reject) => {
      fileData
        .pipe(csv())
        .on("data", (row: any) => {
          xData.push(row[xAxis]);
          yData.push(row[yAxis]);
        })
        .on("end", () => {
          resolve("done");
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });

    const aggregatedData = xData.reduce((acc, curr, index) => {
      if (acc[curr]) {
        acc[curr] += parseInt(yData[index]);
      } else {
        acc[curr] = parseInt(yData[index]);
      }
      return acc;
    }, {});

    // Extract aggregated xData and yData
    xData = Object.keys(aggregatedData);
    yData = Object.values(aggregatedData);

    const chart = await Chart.create({
      title,
      chartType,
      dataset,
      report,
      xAxis,
      yAxis,
      xData,
      yData,
      createdBy: userId,
    });
    const reportObj = await Report.findById(report);
    reportObj.charts.push(chart._id);
    await reportObj.save();
    return NextResponse.json(
      { chart, message: "chart created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
