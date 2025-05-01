'use client';
import { useState } from 'react';

export default function Chat_Window() {
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!message.trim()) return;

        try {
        const res = await fetch('/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            console.error('Failed to send message');
        } else {
            console.log('Message sent!');
            setMessage(''); // Clear the textarea
        }
        } catch (err) {
        console.error('Error:', err);
        }
    };

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2">
            <div className="grid grid-cols-10">
                <textarea
                    id="comment"
                    name="comment"
                    value={message}
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                    className="col-span-8 w-full bg-white px-3 py-1.5 text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    defaultValue={''}
                />
                <button 
                    className="bg-black text-white col-span-2"
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>

        </div>
    )
}