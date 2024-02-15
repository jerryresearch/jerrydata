import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import mysql from "mysql2/promise";

type Props = {
  params: {
    userId: string;
  };
};

export async function POST(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const { host, port, database, user, password, connString } =
      await req.json();

    let client;
    if (connString) {
      client = await mysql.createConnection(connString);
    } else {
      if (!host || !port || !database || !user || !password) {
        return NextResponse.json({ message: "Error" }, { status: 400 });
      }
      client = await mysql.createConnection({
        host,
        port,
        database,
        user,
        password,
      });
    }

    const dataset = await Dataset.create({
      datatype: "MySQL",
      sql: { host, port, database, user, password, connString },
      addedBy: userId,
    });

    await client.end();

    return NextResponse.json(
      { dataset, message: "Dataset added" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
