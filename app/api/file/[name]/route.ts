// import { connectToDB } from "@/utils/mongoose";
// import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import { NextResponse } from "next/server";

type Props = {
  params: {
    name: string;
  };
};

export const GET = async (request: Request, { params: { name } }: Props) => {
  try {
    // await connectToDB();

    // const dynamicSchema = new mongoose.Schema({}, { strict: false });
    // const DynamicModel =
    //   mongoose.models[name] || mongoose.model(name, dynamicSchema);

    // const results = await DynamicModel.find();
    // return new Response(
    //   JSON.stringify({ message: "Data fetched successfully", results }),
    //   { status: 200 }
    // );

    const filepath = "../50000 Sales Records.csv"; // Replace with the actual file url from cloud later

    // Get the requested page number from the query string
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get("page") || "1");

    // Number of records per page
    const pageSize = 100;

    const records: any = [];

    let start: number = (page - 1) * pageSize;
    let end = start + pageSize;

    await new Promise((resolve, reject) => {
      fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", (row) => {
          records.push(row);
        })
        .on("end", () => {
          resolve(records);
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    const totalPages = Math.ceil(records.length / pageSize);
    const paginatedRecords = records.slice(start, end);
    const totalRecords = records.length;

    return NextResponse.json(
      {
        records: paginatedRecords,
        totalRecords: totalRecords,
        currentPage: page,
        totalPages: totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
