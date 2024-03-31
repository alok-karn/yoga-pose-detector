import { userYogaData } from "@/data/constants";

import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

function Activity() {
    return (
        <div className="w-[45%] h-[270px] bg-[#F4F4F4] border-2 border-[#CDCDCD] rounded-lg mr-[-15px]">
            <h1 className="mt-2 mb-2 ml-4 text-xl font-semibold text-gray-800">
                Activity
            </h1>
            <BarChart width={550} height={250} data={userYogaData}>
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#DDE5C7" />
            </BarChart>
        </div>
    );
}

export default Activity;
