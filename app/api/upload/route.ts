import { connectToDB } from "../../../utils/mongoose";
import { Readable } from "stream";
import csv from "csv-parser";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const fileName = file.name.split(".")[0];

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const results: any[] = [];

    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    await new Promise((resolve, reject) => {
      bufferStream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve("completed");
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    const dynamicSchema = new mongoose.Schema({}, { strict: false });
    const DynamicModel = mongoose.model(fileName, dynamicSchema);

    await DynamicModel.insertMany(results);
    const rows = await DynamicModel.countDocuments();

    return new Response(JSON.stringify({ message: "Added to mongoDB", rows }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
