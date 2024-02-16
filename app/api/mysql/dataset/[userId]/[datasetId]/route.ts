import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import mysql from "mysql2/promise";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import fs from "fs";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Props = {
  params: {
    userId: string;
    datasetId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    console.log("mysql");
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
      });
    }

    const [rows, _] = await client.execute("SHOW TABLES");
    // @ts-ignore
    const tableNames = rows.map((row) => row[`Tables_in_${database}`]);

    let tables: any = {};
    for (let i = 0; i < tableNames.length; i++) {
      const [columns, _] = await client.execute(`DESCRIBE ${tableNames[i]}`);
      // @ts-ignore
      const headers = columns.map((column) => column.Field);
      tables[tableNames[i]] = headers;
    }

    await client.end();

    return NextResponse.json({ dataset, tables }, { status: 200 });
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
    console.log("mysql");
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

    const { table, headers } = await req.json();
    if (!table || !headers) {
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
      });
    }

    const [rows, dummy] = await client.execute(
      `SELECT COUNT(*) AS row_count FROM ${table}`
    );
    // @ts-ignore
    const rowCount = rows[0].row_count;

    const [actualRows] = await client.execute(`SELECT * FROM ${table}`);
    let csvStream = headers.map((header: any) => header.name).join(",") + "\n";
    csvStream += actualRows
      // @ts-ignore
      .map((row) => Object.values(row).join(","))
      .join("\n");

    fs.writeFileSync(`${table}.csv`, csvStream, "utf8");
    const buffer = Buffer.from(csvStream);

    // generate random file name to avoid replacing old file with same name
    const randomFileName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");

    const key = randomFileName();

    const params = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: key,
      Body: buffer,
    };

    const openAPIFile = await openai.files.create({
      file: fs.createReadStream(`${table}.csv`),
      purpose: "assistants",
    });

    // upload to s3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const newDataset = await Dataset.findByIdAndUpdate(
      datasetId,
      {
        name: table,
        key,
        openAPIFile,
        headers,
        rows: rowCount,
        columns: headers.length,
        size: buffer.length,
      },
      { runValidators: true, new: true }
    );

    fs.unlink(`${table}.csv`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }
    });
    await client.end();
    return NextResponse.json(
      { dataset: newDataset, message: "Dataset updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
