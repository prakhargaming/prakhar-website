import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "./retrieveContext";
import { readFile } from "fs/promises";
import path from "path";

type ChatHistoryEntry = {
  role: "user" | "model";
  text: string;
};

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    console.log("Send message setup");
    const { message, history } = await req.json();
    const system_prompt_path = path.join(
      process.cwd(),
      "public/system_prompt.txt",
    );
    const system_prompt = await readFile(system_prompt_path, "utf-8");
    const context = await retrieveContext(message);
    const prompt = `Context: ${context.join("\n\n")}\n\nQuery: ${message}`;
    const result = genAI.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: system_prompt,
      },
    });
    const responseText = (await result).text;
    console.log(responseText);
    return NextResponse.json({ response: responseText });
  } catch (err) {
    console.error("Error in send-message:", err);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 },
    );
  }
}
