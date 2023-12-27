import mongoose from "mongoose";
import Chart from "@/models/Chart";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/mongoose";

type Props = {
  params: {
    userId: string;
    reportId: string;
    chartId: string;
  };
};

export async function POST(
  req: Request,
  { params: { userId, reportId, chartId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!reportId || !mongoose.isValidObjectId(reportId)) {
      return NextResponse.json({ message: "Invalid report" }, { status: 403 });
    }
    if (!chartId || !mongoose.isValidObjectId(chartId)) {
      return NextResponse.json({ message: "Invalid chart" }, { status: 403 });
    }

    const oldChart = await req.json();
    if (!oldChart) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }
    delete oldChart._id;
    delete oldChart.createdAt;
    delete oldChart.updatedAt;
    delete oldChart.__v;
    oldChart.title += " Copy";
    // @ts-ignore
    const chart = await Chart.create(oldChart);
    // console.log(chart, "Hello");
    return NextResponse.json(
      { chart, message: "chart created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
