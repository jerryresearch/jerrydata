import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { randomUUID } from "crypto";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email } = (await req.json()) as {
      email: string;
    };

    if (!email) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const token = `${randomUUID()}${randomUUID()}`.replaceAll("-", "");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    await user.save();

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM_ADDRESS = process.env.SENDGRID_FROM_ADDRESS;
    const SENDGRID_RESET_TEMPLATE_ID = process.env.SENDGRID_RESET_TEMPLATE_ID;
    if (!SENDGRID_API_KEY || !SENDGRID_FROM_ADDRESS) {
      return NextResponse.json(
        { message: "Sendgrid data missing" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);
    const link = `${process.env.BASE_URL}/user/reset-password/${token}`;

    const mailOptions = {
      to: user.email,
      from: { name: "Jerrydata", email: SENDGRID_FROM_ADDRESS },
      templateId: SENDGRID_RESET_TEMPLATE_ID,
      dynamicTemplateData: {
        name: user.name,
        url: link,
      },
    };

    // @ts-ignore
    await sgMail.send(mailOptions);
    return NextResponse.json(
      { message: "Password reset mail sent" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
