import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import mysql from "mysql2/promise";

type Props = {
  params: {
    userId: string;
    datasetId: string;
  };
};

export async function GET(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const dataset = await Dataset.findOne({ _id: datasetId, addedBy: userId });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }

    const { host, port, database, user, password, connString } = dataset.sql;

    let client;
    if (connString) {
      client = await mysql.createConnection(connString);
    } else {
      client = await mysql.createConnection({
        host,
        port,
        database,
        user,
        password,
        rowsAsArray: true,
      });
    }

    const [rows, _] = await client.execute("SHOW TABLES");
    // @ts-ignore
    const tableNames = rows.map((row) => row[`Tables_in_${database}`]);
    await client.end();

    return NextResponse.json({ dataset, tableNames }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 403 });
    }

    const dataset = await Dataset.findOne({
      _id: datasetId,
      addedBy: userId,
    });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }

    const { table } = await req.json();
    if (!table) {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }

    const { host, port, database, user, password, connString } = dataset.sql;

    let client;
    if (connString) {
      client = await mysql.createConnection(connString);
    } else {
      client = await mysql.createConnection({
        host,
        port,
        database,
        user,
        password,
        rowsAsArray: true,
      });
    }

    const [columns, _] = await client.execute(`DESCRIBE ${table}`);
    // @ts-ignore
    const headers = columns.map((column) => {
      return { name: column.Field };
    });

    const [rows, dummy] = await client.execute(
      `SELECT COUNT(*) AS row_count FROM ${table}`
    );
    // @ts-ignore
    const rowCount = rows[0].row_count;

    const newDataset = await Dataset.findByIdAndUpdate(
      datasetId,
      {
        name: table,
        headers,
        rows: rowCount,
        columns: headers.length,
      },
      { runValidators: true, new: true }
    );

    await client.end();

    return NextResponse.json(
      { dataset: newDataset, message: "Dataset updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
