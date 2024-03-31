import { useEffect, useState } from "react";

function ProgressBox() {
    const [progress, setProgress] = useState(0);
    const [totalPoses, setTotalPoses] = useState(0);

    // useEffect(() => {
    //     const fetchYogaData = async () => {
    //         try {
    //             const response = await fetch("/api/getyogapose");
    //             const data = await response.json();

    //             if (data.success) {
    //                 const filteredData = data.data.filter(
    //                     (pose) => pose.category !== "undefined"
    //                 );
    //                 const poseWithTrueStatus = filteredData.filter(
    //                     (pose) => pose.status === true
    //                 );
    //                 console.log(
    //                     "Filtered Data: ",
    //                     filteredData.filter((pose) => pose.status === true)
    //                 );
    //                 console.log("Pose with True Status: ", poseWithTrueStatus);
    //                 const totalTruePoses = poseWithTrueStatus.length;
    //                 setTotalPoses(totalTruePoses);

    //                 const progressPercentage =
    //                     (totalTruePoses / filteredData.length) * 100;
    //                 setProgress(progressPercentage);
    //             }
    //         } catch (error) {
    //             console.error("Error Fetching Data", error);
    //         }
    //     };
    //     fetchYogaData(); // calling the function to fetch the data
    // }, []);
    // console.log("Progress: ", progress);
    // console.log("Total Poses: ", totalPoses);
    useEffect(() => {
        const fetchYogaData = async () => {
            try {
                const response = await fetch("/api/getyogapose");
                const data = await response.json();
                console.log("Data received from API:", data);

                if (data.success) {
                    const filteredData = data.data.filter(
                        (pose) => pose.category !== "undefined"
                    );
                    console.log("Filtered Data:", filteredData);

                    const poseWithTrueStatus = filteredData.filter(
                        (pose) => pose.status === "true"
                    );
                    console.log("Pose with True Status:", poseWithTrueStatus);

                    const totalTruePoses = poseWithTrueStatus.length;
                    setTotalPoses(totalTruePoses);

                    const progressPercentage =
                        (totalTruePoses / filteredData.length) * 100;
                    setProgress(Math.round(progressPercentage));
                }
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };
        fetchYogaData(); // calling the function to fetch the data
    }, []);

    return (
        <div className="weeklyProgress w-[40%] h-[250px] bg-[#B0C58E] rounded-lg flex items-center justify-around">
            <h1 className="w-5 text-4xl font-semibold ml-[-40px] text-gray-800">
                Progress
            </h1>
            {/* <div className="flex items-center justify-center border-4 border-orange-400 rounded-full w-28 h-28 progressBox">
                <p className="text-xl font-bold text-gray-900">
                    {progress.toFixed(2)}%
                </p>
            </div> */}
            <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="1"
                aria-valuemax="100"
                style={{ "--value": `${progress}` }}></div>
        </div>
    );
}

export default ProgressBox;
