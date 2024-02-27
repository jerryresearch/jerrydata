import Dataset from "@/models/Dataset";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const datasets = await Dataset.find().sort("-createdAt");
    for (const dataset of datasets) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh/${dataset.addedBy}/${dataset._id}`
      );
    }
    return NextResponse.json({ message: "refresh started" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
