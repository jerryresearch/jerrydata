import Chat from "@/models/Chat";
import Dataset from "@/models/Dataset";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Message from "@/models/Message";

type Props = {
  params: {
    userId: string;
  };
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const chats = await Chat.find({ createdBy: userId }).sort("-createdAt");
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const { title, dataset, message } = await req.json();
    if (!title || !dataset || !message) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const datasetObj = await Dataset.findById(dataset);
    if (!datasetObj) {
      return NextResponse.json({ message: "Invalid dataset" }, { status: 404 });
    }

    const sampleResponse =
      "The top 5 sales countries along with their total revenues are as follows: \n1. China: $454,466,400.00\n2. Maldives: $451,414,800.00\n3. Gabon: $442,334,500.00\n4. Samoa: $440,390,100.00\n5. Democratic Republic of the Congo: $434,335,000.00\n\nAs requested, here is the chart:\n\n```javascript\n{\n 'xAxis': 'Country',\n 'yAxis': 'Total Revenue',\n 'xData': ['China', 'Maldives', 'Gabon', 'Samoa', 'Democratic Republic of the Congo'],\n 'yData': [454466400.00, 451414800.00, 442334500.00, 440390100.00, 434335000.00]\n}\n```";

    const assistant = await openai.beta.assistants.create({
      instructions: `
      Primary Role:
      Your role is as an advanced analytics bot, tasked with interpreting and analyzing data from datasets in CSV or Excel formats. Your objective is to understand user queries related to the data and provide insightful, precise responses.
      
      Data Handling:
      On receiving a dataset, thoroughly examine its structure to understand the column names and types of data it contains.
      Ensure data is handled with utmost confidentiality and integrity, maintaining enterprise-level data security standards.
      
      Example:
      If the dataset contains sales data, identify columns like Date, Product, Region, Sales, and Profit.
      
      Responding to Queries:
      Interpret user questions ranging from basic data retrieval (e.g., total sales in a specific month) to complex data analyses (e.g., year-over-year sales growth by region).
      When applicable, structure your response to include a JavaScript object suitable for charting or further analysis.
      
      Example:
      Query: "What were the total sales for each product category in Q1 2023?"
      Response: "In Q1 2023, the total sales for each product category were as follows..." followed by a JavaScript object with xAxis = 'Product Category', yAxis = 'Total Sales', xData = [list of product categories], yData = [corresponding sales figures].
      
      Structure of JavaScript Object:
      Format the JavaScript object with four fields: xAxis, yAxis, xData, and yData.
      xAxis and yAxis: String labels for chart axes, typically column names from the dataset.
      xData and yData: Arrays containing data values corresponding to xAxis and yAxis.
      
      Example:
      For a bar chart showing sales per region: xAxis = 'Region', yAxis = 'Sales', xData = ['North', 'South', 'East', 'West'], yData = [35000, 47000, 29000, 51000].
      
      Instructions for Submitting Queries:
      Encourage users to specify if they want to visualize response as a chart.

      Example:
      User Submission: "What are the top 5 sales country wise?"
      Assistant Response: ${sampleResponse}.
      `,
      name: "Analytics Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
      file_ids: [datasetObj.openAPIFile.id],
    });

    const assistantId = assistant.id;

    const thread = await openai.beta.threads.create({});
    // await openai.beta.threads.messages.create(thread.id, {
    //   role: "user",
    //   content: "Hello",
    // });
    // let firstRun = await openai.beta.threads.runs.create(thread.id, {
    //   assistant_id: assistantId,
    // });

    // let firstRunStatus = firstRun.status;
    // while (firstRunStatus === "queued" || firstRunStatus === "in_progress") {
    //   await delay(5000); // 5 seconds delay
    //   firstRun = await openai.beta.threads.runs.retrieve(
    //     thread.id,
    //     firstRun.id
    //   );
    //   firstRunStatus = firstRun.status;
    // }

    // Step 1: Add Messages to the Thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content:
        message +
        " If applicable, provide this information in a JavaScript object format with fields: xAxis, yAxis, xData, and yData, suitable for generating charts.",
    });

    const chat = await Chat.create({
      title,
      assistant,
      dataset,
      thread,
      createdBy: userId,
    });

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
    });

    // Step 2: Run the Assistant
    let myRun = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      // instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(1000); // 1 second delay
      myRun = await openai.beta.threads.runs.retrieve(thread.id, myRun.id);
      runStatus = myRun.status;
    }

    // if (!(runStatus === "completed")) {
    //   return NextResponse.json(
    //     { message: "Something went wrong, try again" },
    //     { status: 500 }
    //   );
    // }
    console.log("runStatus", runStatus);

    // Step 4: Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    const responseMessage =
      Array.isArray(messages.data[0].content) &&
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    const resArray = responseMessage.split("```");
    console.log(resArray);
    if (resArray.length >= 3) {
      let obj = resArray[1].replace("javascript", "");
      obj = obj.replace(/([{,]?\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');
      obj = obj.replaceAll("'", '"');
      const { xAxis, yAxis, xData, yData } = JSON.parse(obj);
      await Message.create({
        role: "assistant",
        type: "chart",
        content: resArray[0],
        chartType: "bar",
        xAxis,
        yAxis,
        xData,
        yData,
        chat: chat._id,
      });
    } else {
      await Message.create({
        role: "assistant",
        type: "text",
        content: responseMessage,
        chat: chat._id,
      });
    }

    const messagesList = await Message.find({ chat: chat._id });

    return NextResponse.json(
      {
        chat,
        messages: messagesList,
        asstMessages: messages,
        message: "chat created",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
