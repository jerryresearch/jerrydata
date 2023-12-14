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
    // @ts-ignore
    const report = await Report.create(oldReport);
    return NextResponse.json(
      { report, message: "report created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
