import React, { useState, useEffect, useRef } from 'react';
import useGeminiAPI from '../../hooks/useGeminiApi';
import ChatInput from '../ChatInput/ChatInput';
import botAvatar from '../../assets/bot-avatar.png';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            text: "Hi! I'm Sunderesh Selvaraj. Here are a few things you can ask me:<br>1. What is your background?<br>2. What are your hobbies?<br>3. Tell me about your experience.",
            type: 'bot',
        },
    ]);
    const { getResponse, loading, error } = useGeminiAPI();
    const chatContainerRef = useRef(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (input) => {
        if(!input.trim())
            return;
        // Add user message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, type: 'user' },
        ]);

        const apiResponse = await getResponse(input);
        if (apiResponse) {
            // Add bot response to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: apiResponse.replace(/\n/g, "<br>"), type: 'bot' },
            ]);
        }
    };

    // Render chat messages
    const renderMessages = () => {
        return messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
                {message.type === 'bot' && (
                    <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
                )}
                <div
                    className="message-bubble"
                    dangerouslySetInnerHTML={{ __html: message.text }} // Render HTML
                />
            </div>
        ));
    };

    return (
        <div className="chatbot-container">
            <h1 className="chatbot-heading">Bio Buddy</h1>
            <div className="chatbot-response" ref={chatContainerRef}>
                {renderMessages()}
                {loading && (
                    <div className="message bot">
                        <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
                        <div className="message-bubble">
                            <div className="loading-response"></div>
                            <div className="loading-response"></div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="chatbot-error">
                        <p>{error}</p>
                    </div>
                )}
            </div>
            <ChatInput onSubmit={handleSubmit} />
        </div>
    );
};

export default Chatbot;