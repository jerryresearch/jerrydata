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
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // @ts-ignore
    const report = await Report.findOne({ _id: reportId, createdBy: userId });
    if (!report) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: { userId, reportId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }

    const report = await Report.findOne({
      _id: reportId,
      createdBy: userId,
    });
    if (!report) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }

    const { name, description } = await req.json();

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { name, description },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json(
      { report: updatedReport, message: "report updated" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId, reportId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const report = await Report.findOne({ _id: reportId, createdBy: userId });
    if (!report) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }

    for (const chartId of report.charts) {
      const chart = await Chart.findByIdAndDelete(chartId);
    }

    await Report.findByIdAndDelete(reportId);
    return NextResponse.json(
      { message: `Report ${report.name} deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
