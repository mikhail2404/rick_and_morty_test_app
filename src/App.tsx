import React, { useEffect } from "react";
import "./scss/styles.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Characters from "./pages/Characters/Characters";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="*" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default App;
