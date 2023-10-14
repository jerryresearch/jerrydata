import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/mongoose";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = (await req.json()) as {
      fullName: string;
      email: string;
      password: string;
    };

    console.log(fullName, email, password);
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    await connectToDB();

    const user = await User.create({
      fullName,
      email,
      password: hashed_password,
    });

    console.log(user);

    return NextResponse.json({
      user: {
        name: user.fullName,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
