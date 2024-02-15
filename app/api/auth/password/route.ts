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
      from: SENDGRID_FROM_ADDRESS, // Use the email address or domain you verified above
      subject: "Password change request",
      text: `Hi ${user.name} \nPlease click on the following link ${link} to reset your password. \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await sgMail.send(mailOptions);
    return NextResponse.json(
      { message: "Password reset mail sent" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
