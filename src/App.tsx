import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuList } from "./features/menu/MenuList";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MenuList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
