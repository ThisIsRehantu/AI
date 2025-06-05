import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    input,
    setInput,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCardClick = (text) => {
    setInput(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      onSent(); // Memanggil fungsi kirim
    }
  };

  return (
    <div className={`main ${darkMode ? "dark-mode" : ""}`}>
      <div className="nav">
        <p className="logoName">Gemini</p>
        <i
          onClick={toggleDarkMode}
          className={`fas ${darkMode ? "fa-sun" : "fa-moon"} mode-icon`}
          aria-hidden="true"
        />
        <img src={assets.user_icon} alt="UserIcon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest beautiful places to see on upcoming road trip")
                }
              >
                <p>Suggest beautiful places to see on upcoming road trip</p>
                <img src={assets.compass_icon} alt="CompassIcon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Get inspiration for creative project ideas")
                }
              >
                <p>Get inspiration for creative project ideas</p>
                <img src={assets.bulb_icon} alt="CompassIcon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Ask me anything about programming or coding tips")
                }
              >
                <p>Ask me anything about programming or coding tips</p>
                <img src={assets.message_icon} alt="CompassIcon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Explain the concept of Machine Learning")
                }
              >
                <p>Explain the concept of Machine Learning</p>
                <img src={assets.code_icon} alt="CompassIcon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="UserIcon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="GeminiIcon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div
                  className="formatted-result"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(event) => setInput(event.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />
            <div className="search-box-icon">
              <img src={assets.gallery_icon} alt="GalleryIcon" />
              <img src={assets.mic_icon} alt="MicIcon" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="SendIcon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <a href="#">Your privacy & Gemini Apps</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
