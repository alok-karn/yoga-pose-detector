import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const DynamicTemeratureGraphWithNoSSR = dynamic(
    () => import("@/components/TemperatureGraph"),
    { ssr: false }
);

const YogaScreen = () => {
    const router = useRouter();
    const { poseName } = router.query;

    const labelContainerRef = useRef(null);
    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const webcamRef = useRef(null);
    const [sessionStarted, setSessionStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(120); // 2 minutes in seconds
    const [sessionPaused, setSessionPaused] = useState(false);
    const [pauseTime, setPauseTime] = useState(0); // Time when the session was paused
    useEffect(() => {
        const initModel = async () => {
            try {
                const URL =
                    "https://teachablemachine.withgoogle.com/models/uPxqNRgpF/";
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";

                const loadedModel = await window.tmImage.load(
                    modelURL,
                    metadataURL
                );
                const classes = loadedModel.getTotalClasses();

                setModel(loadedModel);
                setMaxPredictions(classes);
            } catch (error) {
                console.error("Error initializing model:", error);
            }
        };

        initModel();

        return () => {
            if (model) {
                model.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!model || !webcamRef.current || !sessionStarted || sessionPaused)
            return;

        const loop = async () => {
            if (webcamRef.current && webcamRef.current.video) {
                const prediction = await model.predict(webcamRef.current.video);
                setPredictions(prediction);
                window.requestAnimationFrame(loop);
            }
        };

        window.requestAnimationFrame(loop);
    }, [model, sessionStarted, sessionPaused]);

    useEffect(() => {
        let timer;
        if (sessionStarted && !sessionPaused) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer); // Stop the interval when time reaches zero
                        setSessionStarted(false); // Stop the session
                        return 0; // Ensure remaining time is not negative
                    }
                    return prevTime - 1; // Decrease time by 1 second
                });
            }, 1000); // Update remaining time every second
        }
        return () => clearInterval(timer); // Clean up the interval
    }, [sessionStarted, sessionPaused]);

    const handleBack = () => {
        window.history.back();
    };

    const handleStart = () => {
        setSessionStarted(true);
        setRemainingTime(120); // Reset remaining time to 2 minutes
        if (webcamRef.current && webcamRef.current.video) {
            webcamRef.current.video.play();
        }
        setTimeout(() => {
            setSessionStarted(false);
            if (webcamRef.current && webcamRef.current.video) {
                webcamRef.current.video.pause();
            }
        }, 120000); // 2 minutes in milliseconds
    };

    const handleStop = () => {
        setSessionStarted(false);
        if (webcamRef.current && webcamRef.current.video) {
            webcamRef.current.video.pause();
        }
    };

    // toggle sessions

    const handleToggleSession = () => {
        if (!sessionStarted) {
            setSessionStarted(true);
            setRemainingTime(120);
            if (webcamRef.current && webcamRef.current.video) {
                webcamRef.current.video.play();
            }
        } else if (!sessionPaused) {
            setSessionPaused(true);
            setPauseTime(remainingTime);
            if (webcamRef.current && webcamRef.current.video) {
                webcamRef.current.video.pause();
            }
        } else {
            setSessionPaused(false);
            if (webcamRef.current && webcamRef.current.video) {
                webcamRef.current.video.play();
            }
            setRemainingTime(pauseTime);
        }
    };
    // for time remaining countdown

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // update the status of the yoga pose to true after the session is completed

    const updateStatus = async () => {
        try {
            const response = await fetch("/api/updateStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ poseName }),
            });
            if (response.ok) {
                console.log("Yoga Pose status update successfully");
            } else {
                console.error("Failed to update yoga pose status");
            }
        } catch (error) {
            console.error("Error updating yoga pose status: ", error);
        }
    };

    useEffect(() => {
        if (sessionStarted && remainingTime <= 0) {
            updateStatus();
        }
    }, [sessionStarted, remainingTime]);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full h-[50px] py-4 mb-2 px-8 flex items-center justify-between mt-4">
                <h1 className="text-xl font-bold text-gray-800">Yoga Screen</h1>
                <button
                    onClick={handleBack}
                    className="font-medium text-gray-800">
                    {" "}
                    {"<"} &nbsp; Back
                </button>
            </div>
            {/* camera and label container */}
            <div className="flex flex-row gap-4 px-8">
                <div
                    style={{
                        width: "600px",
                        height: "400px",
                        borderRadius: "24px",
                    }}
                    className="bg-gray-200">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        mirrored={true} // If you want the video to be mirrored
                    />
                </div>
                <div className="flex flex-col w-auto h-auto gap-4">
                    {/* Upper part */}
                    <div className="w-[700px] h-[300px] bg-gray-200 rounded-md p-4">
                        <h1>{poseName}</h1>
                        <div id="label-container" ref={labelContainerRef}>
                            {[
                                ...new Set(
                                    predictions
                                        .filter(
                                            (prediction) =>
                                                prediction.probability > 0.85
                                        )
                                        .map(
                                            (prediction) => prediction.className
                                        )
                                ),
                            ].map((className, index) => (
                                <div key={index}>{className}</div>
                            ))}
                        </div>
                        {/* Countdown timer */}
                        <div>Remaining Time: {formatTime(remainingTime)}</div>
                        {/* Display paused time if session is paused */}
                        {sessionPaused && (
                            <div>Paused at: {formatTime(pauseTime)}</div>
                        )}

                        {/* Start and stop buttons */}
                        <div>
                            {/* {!sessionStarted ? (
                                <button
                                    onClick={handleStart}
                                    className="px-4 py-2 bg-[#84CC16] rounded-md font-medium text-gray-50">
                                    Start
                                </button>
                            ) : (
                                <button
                                    onClick={handleStop}
                                    className="px-4 py-2 bg-[#cc4016] rounded-md font-medium text-gray-50">
                                    Stop
                                </button>
                            )} */}

                            <button
                                onClick={handleToggleSession}
                                className={`px-4 py-2 rounded-md font-medium text-gray-50 ${
                                    !sessionStarted || sessionPaused
                                        ? "bg-[#84CC16]"
                                        : "bg-[#cc4016]"
                                }`}>
                                {!sessionStarted || sessionPaused
                                    ? "Start"
                                    : "Pause/Resume"}
                            </button>
                        </div>
                    </div>

                    {/* temperature graph */}
                    <div className="w-[700px] h-[300px] bg-slate-50 flex items-center justify-center mb-4">
                        <DynamicTemeratureGraphWithNoSSR />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YogaScreen;
