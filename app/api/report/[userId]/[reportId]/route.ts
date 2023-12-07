import mongoose from "mongoose";
import Report from "@/models/Report";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/mongoose";

type Props = {
  params: {
    userId: string;
    reportId: string;
  };
};

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
