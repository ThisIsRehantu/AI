import React from "react";
import ContextProvider from "./context/Context";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <ContextProvider>
      <div className="app-container">
        <Sidebar />
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;
