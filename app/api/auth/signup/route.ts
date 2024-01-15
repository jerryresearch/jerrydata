import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/mongoose";

export async function POST(req: Request) {
  try {
    // get details of user from request
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };

    // connect to DB
    await connectToDB();

    // check if user email already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 }
      );
    }

    // hash the password of user
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    // create new user in DB
    const user = await User.create({
      name,
      email,
      password: hashed_password,
      // token: `${randomUUID()}/${randomUUID()}`.replaceAll("-", ""),
    });

    const { password: newPassword, ...rest } = user;

    // send the new user details except password
    return NextResponse.json(
      { user: rest, message: "User created" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
