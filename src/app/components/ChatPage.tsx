import Chat_Window from "./chat_ui/Chat_Window";
import { useState } from "react";

type Message = {
    sender: 'user' | 'bot';
    text: string;
    timestamp: number;
  };

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);

    return(
        <Chat_Window/>
    );
}