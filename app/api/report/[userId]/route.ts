import Report from "@/models/Report";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type Props = {
  params: {
    userId: string;
  };
};

export async function GET(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    // @ts-ignore
    const reports = await Report.find({ createdBy: userId });
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const { name, description } = await req.json();
    if (!name || !description) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }
    // @ts-ignore
    const report = await Report.create({
      name,
      description,
      createdBy: userId,
    });
    return NextResponse.json(
      { report, message: "report created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
