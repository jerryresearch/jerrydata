import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import User from "@/models/User";

type Props = {
  params: {
    userId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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

export async function PATCH(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // get details of user from request
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    // generate random file name to avoid replacing old file with same name
    const randomFileName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const key = `${userId}/${randomFileName()}`;

    // get buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const params = {
      Bucket: process.env.AWS_PUBLIC_IMAGES_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    };

    // upload to s3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: `https://${process.env.AWS_PUBLIC_IMAGES_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      },
      { runValidators: true, new: true }
    );
    // return new NextResponse(JSON.stringify({ message: "User updated" }), {
    //   headers: {
    //     'Access-Control-Allow-Origin': "*",
    //     'Content-Type': "application/json",
    //   }
    // });
    return NextResponse.json({ message: "User updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.image.includes("s3.amazonaws.com")) {
      const key: string = user.image.replace(
        `https://${process.env.AWS_PUBLIC_IMAGES_BUCKET_NAME}.s3.amazonaws.com/`,
        ""
      );
      const params = {
        Bucket: process.env.AWS_PUBLIC_IMAGES_BUCKET_NAME,
        Key: key,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: "" },
      { runValidators: true, new: true }
    );
    return NextResponse.json({ message: "User updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
