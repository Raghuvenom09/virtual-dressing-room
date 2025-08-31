import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedLoginPage from "./components/AnimatedLoginPage";
import VirtualDressingRoom from "./components/VirtualDressingRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimatedLoginPage />} />
        <Route path="/dressing-room" element={<VirtualDressingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
