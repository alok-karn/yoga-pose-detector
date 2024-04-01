import React, { useEffect, useState } from "react";
import { temperatureData } from "@/data/constants";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function TemperatureGraph() {
    // api call from firebase to get temperature data
    const [temData, setTemData] = useState([]);
    useEffect(() => {
        const fetchTempData = async () => {
            // write your logic to fetch the data from firebase
        };
        fetchTempData();
    }, []);
    return (
        <LineChart
            width={600}
            height={300}
            data={temperatureData} // temperatureData replaced with temData if fetched from firebase.
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            {/* // <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
    );
}

export default TemperatureGraph;
