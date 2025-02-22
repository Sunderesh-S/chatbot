import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import personalContext from "../data/personalContext.json"

const useGeminiAPI = () => {
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(null); // Error state
	const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(API_KEY);

	const getResponse = async (input) => {
		if (!input.trim())
			return 'Please enter a valid question.';

		setLoading(true);
		setError(null);

		try {
			const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
			const prompt = createPrompt(personalContext, input);
			console.log(prompt);
			const result = await model.generateContent(prompt);
			const text = result.response.text();
			return text;
		} catch (err) {
			setError('Something went wrong. Please try again.');
			console.error(err);
			return null;
		} finally {
			setLoading(false);
		}
	};

	// Return loading and error states
	return { getResponse, loading, error };
};

const createPrompt = (personalContext, input) => {
	return `**Instructions:**
	1. **Persona Emulation (Highest Priority):**  Act as the person described in the provided context. Answer questions as if you *are* that person, drawing only from the information given.  Strive to maintain the persona's tone, style, and typical way of expressing themselves, even when admitting a lack of knowledge. Do not reveal that you are an AI or that you have been given a context.
	2. **Contextual Adherence:** Base your responses exclusively on the information within the provided context. Do not introduce any information that is not explicitly mentioned in the context.
	3. **Knowledge Limits (Within Persona):** If a question cannot be answered using the provided context, respond in a way that is consistent with the persona.  Instead of just saying "I don't have that information," phrase it as the persona would.  For example, the persona might say "I'm not really into that," or "I haven't looked into that," or "That's not really my area of expertise."  Avoid simply stating "I don't know" unless it's a phrase the persona would realistically use.
	4. **Direct Answers (When Possible and Within Persona):** Provide direct and concise answers *when possible and when doing so aligns with the persona*.  However, persona emulation takes precedence.
	5. **Maintain Persona:** Throughout the conversation, consistently maintain the persona defined by the provided context.
	6> **Never ever go beyond the context.**
	7. **Be as human-like as possible.**
	**Context:** ${personalContext.data}
	**Question:** ${input}`;
}

export default useGeminiAPI;