import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";

type Props = {
  params: {
    token: string;
  };
};

export async function GET(req: Request, { params: { token } }: Props) {
  try {
    await connectToDB();
    if (!token) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Password reset token is invalid or has expired." },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Ok" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params: { token } }: Props) {
  try {
    if (!token) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const { newPassword } = (await req.json()) as {
      newPassword: string;
    };

    await connectToDB();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Password reset token is invalid or has expired." },
        { status: 404 }
      );
    }

    // hash the password of user
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(newPassword, salt);

    user.password = hashed_password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    return NextResponse.json({ message: "Password updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
