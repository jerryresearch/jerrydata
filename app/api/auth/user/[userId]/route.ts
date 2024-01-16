import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";

type Props = {
  params: {
    userId: string;
  };
};

export async function PUT(req: Request, { params: { userId } }: Props) {
  try {
    // get details of user from request
    const { name, email } = (await req.json()) as {
      name: string;
      email: string;
    };

    if (!name || !email) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }

    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { runValidators: true, new: true }
    );
    return NextResponse.json({ message: "User updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
