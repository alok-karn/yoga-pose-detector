import React from "react";

const SkeletonYogaPoseLoader = () => {
    const ContainerArray = new Array(6).fill(null);
    return (
        <div className="w-[580px] h-[300px] bg-gray-50 p-4 flex gap-4 items-center rounded-[22px]">
            <div className="w-[200px] h-[250px] object-cover rounded-xl image" />
            <div className="flex flex-col w-auto h-auto gap-4">
                <h2 className="text-xl font-bold text-gray-700 mt-[-45px] heading w-[200px] h-8 rounded-md"></h2>
                <p className="w-[250px] rounded-md h-24 text-sm text-justify desc"></p>

                <p className="px-5 py-2 w-[100px] h-[40px] flex items-center justify-center text-[14px] font-bold text-gray-100 rounded-md start_button"></p>
            </div>
        </div>
    );
};

export default SkeletonYogaPoseLoader;
