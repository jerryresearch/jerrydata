import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";

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
    const datasets = await Dataset.find({ createdBy: userId });
    return NextResponse.json(datasets, { status: 200 });
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
    const data = await req.formData();
    const fileUrl = "dummy url";
    const file: File | null = data.get("file") as unknown as File;
    const name = file.name.split(".")[0];
    const datatype = data.get("datatype");
    const size = file.size;
    const rows = data.get("rows");
    const columns = data.get("columns");
    if (!fileUrl || !name || !datatype || !size || !rows || !columns) {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
    const dataset = await Dataset.create({
      fileUrl,
      name,
      datatype,
      size,
      rows,
      columns,
      addedBy: userId,
    });
    return NextResponse.json(
      { dataset, message: "Dataset added" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
