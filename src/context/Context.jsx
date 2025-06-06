import React, { createContext, useState } from "react";
import runChat from "../config/gemini"; // fungsi untuk memanggil Gemini API

export const Context = createContext();

const ContextProvider = (props) => {
  // ─────────────────────────────────────────────────────────────
  // 1. State‐state utama
  const [input, setInput] = useState("");            // isi textarea/input user
  const [recentPrompt, setRecentPrompt] = useState(""); 
  const [prevPrompts, setPrevPrompts] = useState([]); 
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);     // untuk spinner loading
  const [resultData, setResultData] = useState("");  // untuk menyimpan jawaban dari API
  // ─────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────
  // 2. onSent: Fungsi yang dipanggil ketika user klik "Send"
  const onSent = async (prompt) => {
    if (!prompt.trim()) return;         // kalau kosong, abaikan
    setLoading(true);
    setShowResult(false);
    try {
      // 2.1. Panggil Gemini API melalui helper runChat()
      const responseText = await runChat(prompt);

      // 2.2. Simpan ke state
      setResultData(responseText);
      setRecentPrompt(prompt);

      // 2.3. Tambah ke riwayat prompt
      setPrevPrompts((prev) => [prompt, ...prev]);

      setShowResult(true);
    } catch (err) {
      console.error("Error memanggil Gemini API:", err);
      // (Opsional) kamu bisa set resultData ke pesan error
      setResultData("⚠️ Terjadi kesalahan, cek console untuk detail.");
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };
  // ─────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────
  // 3. Fungsi newChat, jika ingin memulai “percakapan” baru (clear)
  const newChat = () => {
    setInput("");
    setRecentPrompt("");
    setPrevPrompts([]);
    setResultData("");
    setShowResult(false);
  };
  // ─────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────
  // 4. Paketkan semua ke dalam contextValue agar bisa di‐consume oleh komponen
  const contextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    newChat,
  };
  // ─────────────────────────────────────────────────────────────

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
