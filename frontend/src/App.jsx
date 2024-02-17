import { useState } from "react";
import Hero from "./hero";
import ListItem from "./ListItem";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Register from "./Register";
import Login from "./login";
import Sidepanel from "./sidepanel";
import Home from "./home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
