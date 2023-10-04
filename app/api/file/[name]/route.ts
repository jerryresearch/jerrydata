import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";

type Props = {
  params: {
    name: string;
  };
};

export const GET = async (request: Request, { params: { name } }: Props) => {
  try {
    await connectToDB();

    const dynamicSchema = new mongoose.Schema({}, { strict: false });
    const DynamicModel =
      mongoose.models[name] || mongoose.model(name, dynamicSchema);

    const results = await DynamicModel.find();
    return new Response(
      JSON.stringify({ message: "Data fetched successfully", results }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
