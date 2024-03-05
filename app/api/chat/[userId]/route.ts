export const maxDuration = 300;

import Chat from "@/models/Chat";
import Dataset from "@/models/Dataset";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import csv from "csv-parser";
import { OpenAI } from "openai";
import Message from "@/models/Message";

type Props = {
  params: {
    userId: string;
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
    const { title, dataset, message, mode } = await req.json();
    if (!title || !dataset || !message || !mode) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid request, user not found" },
        { status: 403 }
      );
    }

    const datasetObj = await Dataset.findById(dataset);
    if (!datasetObj) {
      return NextResponse.json({ message: "Invalid dataset" }, { status: 404 });
    }

    const dissectAssistant = await openai.beta.assistants.create({
      instructions: `
        You are an assistant that writes only speaks json. Strictly do not write normal text.
        You are a highly skilled SQL query writer with expertise in database management and analysis. Your task is to generate precise SQL queries based on natural language descriptions of data retrieval or manipulation tasks.
        Your queries should adhere to best practices in SQL syntax and be optimized for performance.
        You NEVER include sensitive information or hints at bypassing security measures.
        Always return your output in valid JSON format.
        
        EXAMPLE:
        INPUT: "Retrieve the total sales for each product category in March 2021."
        OUTPUT: 
        {
          "sql_query": "SELECT product_category, SUM(sales) AS total_sales FROM sales_records WHERE sale_date BETWEEN '2021-03-01' AND '2021-03-31' GROUP BY product_category;",
          "explanation": "This SQL query selects the product categories and the sum of sales for each category from the sales_records table. It filters records to include only those from March 2021, then groups the results by product category to display the total sales per category within that month.",
          "assumptions": [
            "The sales_records table contains a column named 'product_category' that categorizes each sale.",
            "The 'sales' column in the sales_records table represents the sale amount for each transaction.",
            "The 'sale_date' column in the sales_records table is in 'YYYY-MM-DD' format."
          ]
        }
      `,
      name: "SQL Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-1106-preview",
      file_ids: [datasetObj.openAPIFile.id],
    });

    const exploratoryAssistant = await openai.beta.assistants.create({
      instructions: `
        You are an assistant that writes only speaks json. Strictly do not write normal text.
        You specialize in conducting deep data analysis within "Exploratory Mode," aimed at uncovering underlying patterns, diagnosing causes, and identifying actionable opportunities within complex datasets.
        In this mode, your task is to generate an actual analysis that answers critical "How," "Why," and "What" questions, and culminates in a strategic "Suggestion" based on the insights derived. This involves synthesizing data into coherent narratives that reveal the intricacies of business dynamics, customer behavior, market trends, and operational efficiencies.
        Your output should not only address the posed inquiries but also provide a detailed examination of the data, leveraging advanced analytics techniques and SQL queries where applicable. This approach ensures a comprehensive understanding of the dataset, empowering users with the knowledge to make informed strategic decisions.
        Adhere to best practices in data analysis and SQL syntax, ensuring all suggestions are optimized for actionable insights, without compromising data security or integrity.
        Always return your output in valid JSON format, containing a detailed analysis that encompasses responses to "How," "Why," "What," and includes a practical, data-backed "Suggestion" for actionable steps forward.
        
        EXAMPLE:
        INPUT: "Perform an exploratory analysis to understand the factors affecting sales performance in Q1 2021."
        OUTPUT: 
        {
          "analysis": {
            "how": "Seasonal trends, such as post-holiday sales dips, significantly impacted overall sales performance in Q1, as evidenced by a 15% decrease in sales volume compared to Q4 of the previous year.",
            "why": "Certain product categories, specifically outdoor and leisure, outperformed others due to increased consumer interest in outdoor activities, aligning with public health guidelines.",
            "what": "Analysis of marketing campaign effectiveness revealed that digital campaigns had a 20% higher engagement rate and directly correlated with a spike in sales for the targeted products.",
            "suggestion": "To mitigate the impact of seasonal trends on sales, diversify the product portfolio to include items with year-round appeal. Increase investment in digital marketing campaigns for high-engagement product categories, particularly before the onset of Q2 to capitalize on the outdoor activity trend."
          }
        }
      `,
      name: "Exploratory Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-1106-preview",
      file_ids: [datasetObj.openAPIFile.id],
    });

    // const assistant = await openai.beta.assistants.create({
    //   instructions: `
    //   Interpret User Queries: When you receive a user query regarding data analysis and visualization, analyze the query to understand the key components necessary for creating a chart. Focus on identifying the metrics or dimensions mentioned in the query.

    //   Determine Chart Parameters:
    //   Chart Type: Based on the query, determine the most appropriate type of chart from "bar", "doughnut", "pie", "line", "polar area", "horizontal bar". Consider the nature of the data and the user's intent in your decision.
    //   X and Y Axes: Identify which data columns should be mapped to the x-axis and y-axis. These should be directly derived from the key components of the user's query and both of them should be exactly a column name from the dataset.
    //   Chart Title: Generate a concise and informative title for the chart that reflects the user's intent and the data being visualized.
    //   Generate Standardized JSON Output: Your response should be a JSON object containing the details necessary for creating the chart. The format of your response should be as follows:
    //   {
    //     "chartType": "<Identified Chart Type>",
    //     "xAxis": "<Column for X-axis>",
    //     "yAxis": "<Column for Y-axis>",
    //     "title": "<Generated Chart Title>"
    //   }

    //   Clarity and Precision: Ensure that your responses are clear and directly address the user's query. The output should be unambiguous and precisely formatted as per the JSON structure outlined.

    //   User-Centric Approach: Always prioritize the user's analytical needs and the context of their query when generating the output. Your response should facilitate an intuitive and insightful visualization of the data as per the user's request.

    //   `,
    //   name: "Analytics Assistant",
    //   tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
    //   model: "gpt-4-1106-preview",
    //   file_ids: [datasetObj.openAPIFile.id],
    // });

    const thread = await openai.beta.threads.create({});

    // Step 1: Add Messages to the Thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    const chat = await Chat.create({
      title,
      dissectAssistant,
      exploratoryAssistant,
      dataset,
      thread,
      createdBy: userId,
    });

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
      mode,
    });

    const assistantId =
      mode === "Exploratory" ? exploratoryAssistant.id : dissectAssistant.id;

    // Step 2: Run the Assistant
    let myRun = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      // instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    console.log("fetch resp");
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

    // console.log(responseMessage);
    const resArray = responseMessage.split("```");
    if (resArray.length >= 3) {
      let obj = resArray[1].replace("json", "");
      let { chartType, xAxis, yAxis, title } = JSON.parse(obj);

      const getObjectParams = {
        Bucket: process.env.AWS_FILES_BUCKET_NAME,
        Key: datasetObj.key,
      };

      const command = new GetObjectCommand(getObjectParams);
      const resp = await s3.send(command);
      const fileData: any = resp.Body;

      let xData: any[] = [];
      let yData: any[] = [];

      await new Promise((resolve, reject) => {
        fileData
          .pipe(csv())
          .on("data", (row: any) => {
            xData.push(row[xAxis]);
            yData.push(row[yAxis]);
          })
          .on("end", () => {
            resolve("done");
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

      const aggregatedData = xData.reduce((acc, curr, index) => {
        if (acc[curr]) {
          acc[curr] += parseInt(yData[index]);
        } else {
          acc[curr] = parseInt(yData[index]);
        }
        return acc;
      }, {});

      // Extract aggregated xData and yData
      xData = Object.keys(aggregatedData);
      yData = Object.values(aggregatedData);

      await Message.create({
        role: "assistant",
        type: "chart",
        title,
        content: resArray[0],
        chartType,
        xAxis,
        yAxis,
        xData,
        yData,
        chat: chat._id,
      });
      console.log("chart done");
    } else {
      console.log("message done");
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
