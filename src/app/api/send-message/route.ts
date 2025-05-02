import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "./retrieveContext";
import { readFile } from 'fs/promises';
import path from 'path';

type ChatHistoryEntry = {
    role: 'user' | 'model';
    text: string;
  };  

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI! });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const system_prompt_path = path.join(process.cwd(), 'public/system_prompt.txt');
    const system_prompt = await readFile(system_prompt_path, 'utf-8');


    // Reconstruct chat from passed history
    const chat = genAI.chats.create({
        model: "gemini-2.0-flash",
        // history: history.map((entry: ChatHistoryEntry) => ({
        //     role: entry.role,
        //     parts: [{ text: entry.text }],
        //   }))
        config: {
            systemInstruction: system_prompt,
        },
    });
    
    const context = await retrieveContext(message)
    const result = await chat.sendMessage({ message: `Context: ${context.join('\n\n')}\n\nQuery: ${message}` });

    const responseText = result.text;
    console.log(result.text)
    return NextResponse.json({ response: responseText });
  } catch (err) {
    console.error("Error in send-message:", err);
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
  }
}
