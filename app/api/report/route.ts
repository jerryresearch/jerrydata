import Report from "@/models/Report";
import { NextResponse } from "next/server";

type Props = {
  params: {
    userId: string;
  };
};

export async function POST(req: Request) {
  try {
    const { userId, title } = await req.json();
    if (!userId || !title) {
      return NextResponse.json({ message: "Error" });
    }
    const report = await Report.create({ title, createdBy: userId });
    return NextResponse.json({ report });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
