import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const YogaPoseContainer = ({ pose }) => {
    const router = useRouter();

    const handleStart = () => {
        router.push({
            pathname: "/yogascreen",
            query: { poseName: pose.name },
        });
    };

    return (
        <div className="w-[580px] h-[300px] bg-gray-50 p-4 flex gap-4 items-center rounded-[22px]">
            <img
                src="https://t3.ftcdn.net/jpg/05/99/11/22/360_F_599112273_oQmTC5kfpOhDnbbsgWDn8gVzEVc81cDN.jpg"
                alt="yoga"
                className="w-[200px] h-[250px] object-cover rounded-xl"
            />
            <div className="flex flex-col w-auto h-auto gap-4">
                <h2 className="text-xl font-bold text-gray-700 mt-[-88px]">
                    {pose.name}
                </h2>
                <p className="text-sm text-justify ">{pose.description}</p>

                <button
                    // href={`/yogascreen`}
                    onClick={handleStart}
                    className="px-5 py-2 bg-green-500 w-[100px] flex items-center justify-center text-[14px] font-bold text-white rounded-md hover:bg-green-600">
                    Start
                </button>
            </div>
        </div>
    );
};

export default YogaPoseContainer;
