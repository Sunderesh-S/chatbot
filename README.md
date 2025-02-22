# Personal Chatbot with Gemini API

A simple React-based chatbot that uses the Gemini API to provide personalized responses. The chatbot is designed to answer questions about you (e.g., your background, experience, hobbies) based on a predefined context.

Try it here: https://chatbot-bay-theta.vercel.app/

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/))

---

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sunderesh-S/chatbot.git
   cd chatbot
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   - Create a `.env` file in the root of the project.
   - Add your Gemini API key to the file:
     ```env
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the App**:
   - Visit `http://localhost:3000` in your browser to use the chatbot.

---

## Project Structure
```
src/
├── components/       # React components (Chatbot, ChatInput)
├── hooks/            # Custom hooks (useGeminiAPI)
├── data/             # Data
├── app.css           # CSS files
├── App.jsx           # Main application component
├── main.jsx          # Entry point
.env                  # Environment variables (API key)
```

---

## Customization
- Update the personal context in the `personalContext.json` file to reflect your background, experience, hobbies etc...
- Modify the CSS in `styles.css` to customize the chat window's appearance.

---

Let me know if you need further adjustments! 😊