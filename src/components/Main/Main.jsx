import React, { useContext, useState } from "react";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    input,
    setInput,
    onSent,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    newChat,
  } = useContext(Context);

  // State lokal untuk textarea otomatis focus, dll
  const [localInput, setLocalInput] = useState("");

  // Ketika user klik tombol Send
  const handleSend = () => {
    onSent(localInput);
  };

  // Ketika user tekan Enter di textarea
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSent(localInput);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="nav">
        <p className="logoName">Gemini Clone</p>
        {/* Tombol New Chat */}
        <button onClick={newChat} className="newChatButton">
          New Chat
        </button>
      </div>

      <div className="main-container">
        {/* Jika belum pernah kirim pertanyaan, tampilkan greeting */}
        {!showResult && prevPrompts.length === 0 && !loading && (
          <div className="greet">
            <p>
              <span>Hello, Dev! 🎉</span> <br />
              Tanyakan apa saja ke Gemini AI.
            </p>
          </div>
        )}

        {/* Area input */}
        <div className="input-area">
          <textarea
            className="chat-input"
            placeholder="Type your question..."
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend} className="sendButton">
            Send
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="loading">
            <span className="loader" />
            <p>Loading...</p>
          </div>
        )}

        {/* Tampilkan hasil jawaban */}
        {showResult && !loading && (
          <div className="result-area">
            <p className="question-display">
              <b>Q:</b> {recentPrompt}
            </p>
            <p className="answer-display">
              <b>A:</b> {resultData}
            </p>
          </div>
        )}

        {/* Jika ada riwayat (prevPrompts), tampilkan sederet pertanyaan sebelumnya */}
        {prevPrompts.length > 0 && (
          <div className="history">
            <p className="history-title">History:</p>
            <ul>
              {prevPrompts.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="bottom-info">
          Gemini ialah model AI yang mungkin kadang jawaban kurang tepat,
          mohon cek kebenarannya.{" "}
          <a href="#">Privacy &amp; Gemini</a>
        </p>
      </div>
    </div>
  );
};

export default Main;
