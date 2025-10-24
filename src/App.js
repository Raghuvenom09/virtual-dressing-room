import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginPage from "./components/LoginPage";
import VirtualDressingRoom from "./components/VirtualDressingRoom";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/virtual-dressing" element={<VirtualDressingRoom />} />
    </Routes>
  </Router>
);

export default App;
