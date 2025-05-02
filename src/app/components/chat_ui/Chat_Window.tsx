'use client';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat_Window() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi, my name is PrakharGaming, I am an LLM based on Google Gemini 2.0 Flash and I'm here to answer questions about Prakhar's software engineering background! How can I help you?", sender: 'bot' },
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        if (!message.trim() || isLoading) return;
    
        try {
            // Add user message to chat
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: 'user'
            };
            const updatedMessages = [...messages, newMessage];
            const prunedMessages = updatedMessages.filter(msg => msg.id !== 1);
            setMessages(updatedMessages);
    
            // Clear input and set loading state
            setMessage('');
            setIsLoading(true);
    
            /// Construct chat history in required format
            const chatHistory = updatedMessages
            .filter(m => m.sender === 'user' || m.sender === 'bot')
            .map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                text: m.text
            }));

            // Ensure history starts with a user message
            const firstUserIndex = chatHistory.findIndex(m => m.role === 'user');
            const prunedHistory = firstUserIndex !== -1 ? chatHistory.slice(firstUserIndex) : [];

    
            // Make API call with history
            const res = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    history: prunedHistory
                }),
            });
    
            const data = await res.json();
    
            // Add bot response to chat
            const botMessage = {
                id: updatedMessages.length + 1,
                text: data.response,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    // Handle Enter key to send message
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col w-3/4 justify-self-center">
            {/* Scrollable message container */}
            <div className="flex-1 overflow-y-auto p-10">
            {messages.map(msg => (
                <div 
                    key={msg.id} 
                    className={`mb-4 p-3 ${
                        msg.sender === 'user' 
                            ? 'ml-auto bg-black text-white' 
                            : 'mr-auto bg-white text-black border border-gray-200'
                    }`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => (
                                <p {...props} className="mb-2 last:mb-0" />
                            ),
                            a: ({ node, ...props }) => (
                                <a {...props} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul {...props} className="list-disc list-inside last:mb-2" />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol {...props} className="list-decimal list-inside last:mb-2" />
                            ),
                            li: ({ node, ...props }) => (
                                <li {...props} className="ml-4 last:mb-2" />
                            ),
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
            ))}

                {isLoading && (
                    <div className="mr-auto bg-white text-black border border-gray-200 p-3 max-w-xs">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Fixed input at bottom */}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2">
                <div className="grid grid-cols-10 bg-white p-4">
                    <textarea
                        id="comment"
                        name="comment"
                        value={message}
                        rows={3}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="col-span-8 w-full resize-none bg-white px-3 py-1.5 text-black outline outline-1 -outline-offset-2 outline-gray-300 focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-black sm:text-sm/ disabled:opacity-50"
                    />
                    <button 
                        className="bg-black text-white col-span-2 disabled:bg-white disabled:text-gray-500"
                        onClick={handleSubmit}
                        disabled={isLoading || !message.trim()}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}