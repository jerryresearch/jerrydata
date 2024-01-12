import mongoose from "mongoose";
import Report from "@/models/Report";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/mongoose";
import Chart from "@/models/Chart";

type Props = {
  params: {
    userId: string;
    reportId: string;
  };
};

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

    const oldReport = await req.json();
    if (!oldReport) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }
    delete oldReport._id;
    delete oldReport.createdAt;
    delete oldReport.updatedAt;
    oldReport.name += " Copy";

    const oldCharts = oldReport.charts;
    delete oldReport.charts;
    // @ts-ignore
    const report = await Report.create(oldReport);

    const duplicateCharts = [];
    for (const id of oldCharts) {
      const oldChart = await Chart.findById(id);
      const {
        title,
        chartType,
        dataset,
        createdBy,
        xAxis,
        yAxis,
        xData,
        yData,
      } = oldChart;

      const newChart = {
        title: title + " copy",
        chartType,
        dataset,
        report: report._id,
        createdBy,
        xAxis,
        yAxis,
        xData,
        yData,
      };

      const chart = await Chart.create(newChart);
      duplicateCharts.push(chart._id);
    }
    report.charts = duplicateCharts;
    await report.save();

    return NextResponse.json(
      { report, message: "report created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
