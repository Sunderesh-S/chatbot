import { useState } from 'react';
import "./ChatInput.css";

const ChatInput = ({ onSubmit }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="chat-input"
            />
            <button type="submit" className="chat-input-button">
                Ask
            </button>
        </form>
    );
};

export default ChatInput;