import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { verifyPassword } from "@/utils/verifyPassword";

type Props = {
  params: {
    userId: string;
  };
};

export async function PUT(req: Request, { params: { userId } }: Props) {
  try {
    // get details of user from request
    const { oldPassword, newPassword } = (await req.json()) as {
      oldPassword: string;
      newPassword: string;
    };

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await verifyPassword(oldPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 403 }
      );
    }

    // hash the password of user
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashed_password },
      { runValidators: true, new: true }
    );
    return NextResponse.json({ message: "Password updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
