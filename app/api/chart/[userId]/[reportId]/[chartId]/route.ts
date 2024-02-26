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
    chartId: string;
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

export async function GET(
  req: Request,
  { params: { userId, reportId, chartId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }
    if (!chartId || !mongoose.isValidObjectId(chartId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }
    // @ts-ignore
    const chart = await Chart.findOne({
      _id: chartId,
      createdBy: userId,
      report: reportId,
    });
    if (!chart) {
      return NextResponse.json({ message: "Chart not found" }, { status: 404 });
    }
    return NextResponse.json(chart, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId, reportId, chartId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }
    if (!chartId || !mongoose.isValidObjectId(chartId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }
    // @ts-ignore
    const chart = await Chart.findOne({
      _id: chartId,
      createdBy: userId,
      report: reportId,
    });
    if (!chart) {
      return NextResponse.json({ message: "Chart not found" }, { status: 404 });
    }

    await Chart.findByIdAndDelete(chartId);
    const report = await Report.findById(reportId);
    const charts = report.charts.filter((id: string) => id != chartId);
    report.charts = [...charts];
    await report.save();

    return NextResponse.json(
      { message: `Chart ${chart.title} deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: { userId, reportId, chartId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }
    if (!chartId || !mongoose.isValidObjectId(chartId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }

    // @ts-ignore
    const chart = await Chart.findOne({
      _id: chartId,
      createdBy: userId,
      report: reportId,
    });
    if (!chart) {
      return NextResponse.json({ message: "Chart not found" }, { status: 404 });
    }

    const { title, chartType, dataset, xAxis, yAxis } = await req.json();
    if (
      dataset == chart.dataset &&
      xAxis == chart.xAxis &&
      yAxis == chart.yAxis
    ) {
      const updatedChart = await Chart.findByIdAndUpdate(
        chartId,
        { title, chartType },
        {
          new: true,
          runValidators: true,
        }
      );
      return NextResponse.json(
        { chart: updatedChart, message: "chart updated" },
        { status: 201 }
      );
    }

    const datasetObj = await Dataset.findById(dataset);
    if (!datasetObj) {
      return NextResponse.json({ message: "Invalid request" }, { status: 404 });
    }

    const getObjectParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_FILES_BUCKET_NAME,
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

    const updatedChart = await Chart.findByIdAndUpdate(
      chartId,
      { title, chartType, dataset, xAxis, yAxis, xData, yData },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedChart.xAxis);
    return NextResponse.json(
      { chart: updatedChart, message: "chart updated" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
