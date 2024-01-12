import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";

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

    const user = await User.findOne({ emailVerified: false, token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      emailVerified: true,
    });
    return NextResponse.json(
      { user: updatedUser, message: "Account activated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
