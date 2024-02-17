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

function App() {
  return (
    <>
      {/* <div className="bg-slate-900">
        <Hero />
        <ListItem />
        <div className="mt-5 px-10 pb-10 grid grid-cols-2 grid-row-1 grid-flow-col gap-4">
          <div className="border rounded-md p-5 bg-white">
            <BarChart />
          </div>
          <div className="border rounded-md p-5 bg-white">
            <LineChart />
          </div>
        </div>
      </div> */}

      <Register />
    </>
  );
}

export default App;
