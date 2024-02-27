import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Client } from "pg";
import crypto from "crypto";
import fs from "fs";
import { OpenAI } from "openai";
import { decrypt } from "@/utils/encryption";

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
    console.log("postgresql");
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

    let { host, port, database, user, password, connString } = dataset.sql;

    let client;
    if (connString) {
      client = new Client({
        connectionString: connString,
      });
    } else {
      password = decrypt(
        password,
        process.env.SQL_KEY as string,
        process.env.SQL_IV as string
      );

      client = new Client({
        host,
        port,
        database,
        user,
        password,
      });
    }

    await client.connect();
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    const tableNames: string[] = result.rows.map((row) => row.table_name);
    let tables: any = {};

    for (let i = 0; i < tableNames.length; i++) {
      const result = await client.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = $1;",
        [tableNames[i]]
      );
      const headers = result.rows.map((header: any) => header.column_name);
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
    console.log("postgresql");
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

    const sql = dataset.sql;
    let { host, port, database, user, password, connString } = sql;

    let client;
    if (connString) {
      client = new Client({
        connectionString: connString,
      });
    } else {
      password = decrypt(
        password,
        process.env.SQL_KEY as string,
        process.env.SQL_IV as string
      );

      client = new Client({
        host,
        port,
        database,
        user,
        password,
      });
    }

    await client.connect();

    const rows = await client.query(
      `SELECT COUNT(*) AS row_count FROM ${table};`
    );
    const rowCount = rows.rows[0].row_count;

    const size = await client.query(
      `SELECT pg_total_relation_size('${table}') AS total_size, pg_relation_size('${table}') AS data_size;`
    );
    const dataSizeBytes = parseInt(size.rows[0].data_size);

    const rw = await client.query(`SELECT * FROM ${table}`);

    let csvStream = headers.map((header: any) => header.name).join(",") + "\n";
    csvStream += rw.rows.map((row) => Object.values(row).join(",")).join("\n");

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
        size: dataSizeBytes,
        sql: { ...sql, table },
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
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
