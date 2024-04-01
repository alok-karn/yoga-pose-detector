import { userYogaData } from "@/data/constants";
import { useEffect, useState } from "react";

import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

function Activity() {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchUserActivity = async () => {
            try {
                const activityData = await fetch("/api/getUserActivity", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await activityData.json();
                console.log(data.data);
                setActivityData(data.data);
            } catch (error) {
                console.error("Error fetching user activity:", error);
            }
        };
        fetchUserActivity();
    }, []);
    return (
        <div className="w-[45%] h-[270px] bg-[#F4F4F4] border-2 border-[#CDCDCD] rounded-lg mr-[-15px]">
            <h1 className="mt-2 mb-2 ml-4 text-xl font-semibold text-gray-800">
                Activity
            </h1>
            <BarChart width={550} height={250} data={activityData} barSize={30}>
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-sm" />
                <Tooltip viewBox={{ x: 0, y: 0, width: 0, height: 0 }} />
                <Legend />
                <Bar dataKey="totalSessionCount" fill="#DDE5C7" />
            </BarChart>
        </div>
    );
}

export default Activity;
