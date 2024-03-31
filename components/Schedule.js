import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce } from "react-awesome-reveal";
import Swal from "sweetalert2";

function ScheduledExercisesList({ exercise, key, onDelete }) {
    const handleDelete = () => {
        // Show confirmation dialog before deleting
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Call onDelete function with exercise ID
                onDelete(exercise._id);
            }
        });
    };
    return (
        <div
            key={key}
            className="flex items-center justify-between tw-auto h-10 gap-2 p-2 bg-white rounded-sm mb-2">
            <p className="text-lg font-medium text-gray-800 capitalize">
                {exercise.asanaName}
            </p>
            <p className="text-xs font-medium">{exercise.date.slice(0, 10)}</p>
            <p className="text-xs font-medium text-gray-600">{exercise.time}</p>
            <button
                onClick={handleDelete}
                className="bg-red-400 rounded-md font-bold px-2 py-1 text-[10px] hover:bg-red-500">
                Delete
            </button>
        </div>
    );
}

// this is a scheduled exercises card

function ScheduledExercisesCard({ exercise, key, onDelete }) {
    const handleDelete = () => {
        // Show confirmation dialog before deleting
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Call onDelete function with exercise ID
                onDelete(exercise._id);
            }
        });
    };

    return (
        <div
            key={key}
            className="w-[160px] h-[150px] p-2 rounded-2xl bg-[#1d3d1d42] shadow-md mb-2">
            <h2 className="text-[18px] font-bold text-gray-100 mb-4 capitalize">
                {exercise.asanaName}
            </h2>
            <p className="text-sm font-semibold text-gray-100 mb-2">
                Scheduled On
            </p>
            <p className="text-gray-100 text-xs mb-2 ">
                {exercise.date.slice(0, 10)}
            </p>
            <p className="text-gray-100 text-xs">{exercise.time}</p>
            <div className="w-full h-6 flex items-center justify-end">
                <button
                    onClick={handleDelete}
                    className="bg-[#ff2b2be3] px-2 py-1 rounded-md text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4">
                        <path
                            fillRule="evenodd"
                            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function Schedule() {
    const [scheduledExercises, setScheduledExercises] = useState([]);
    const [showAllScheduledExercises, setShowAllScheduledExercises] =
        useState(false);

    useEffect(() => {
        const fetchScheduledExercises = async () => {
            try {
                const response = await fetch("/api/schedule", {
                    method: "GET",
                });
                const data = await response.json();
                // console.log("DATA", data);
                setScheduledExercises(data.data);
            } catch (error) {
                console.error("Error fetching scheduled exercises: ", error);
            }
        };
        fetchScheduledExercises(); // Call the function to fetch data
    }, []); // Add an empty dependency array to run only once on mount

    // console.log("scheduledExercises", scheduledExercises);

    const handleDeleteExercise = async (exerciseId) => {
        try {
            const response = await fetch(`/api/schedule?id=${exerciseId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                // Remove the deleted exercise from the state
                setScheduledExercises((prevExercises) =>
                    prevExercises.filter(
                        (exercise) => exercise._id !== exerciseId
                    )
                );
                Swal.fire({
                    title: "Exercise Deleted!",
                    text: "The exercise has been successfully deleted.",
                    icon: "success",
                });
            } else {
                throw new Error(data.error || "Failed to delete exercise");
            }
        } catch (error) {
            console.error("Error deleting exercise: ", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the exercise.",
                icon: "error",
            });
        }
    };

    const handleScheduleExercise = () => {
        const result = Swal.fire({
            title: "Schedule an Exercise",
            html: `
                <input id="swal-asana-name" type="text" placeholder="Enter asana name" class="swal2-input">
                <input id="swal-date" type="date" min="${new Date().toLocaleDateString(
                    "en-US"
                )}" class="swal2-input">
                <input id="swal-time" type="time" min="09:00" max="18:00" class="swal2-input">
            `,
            showCancelButton: true,
            confirmButtonText: "Schedule",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const scheduledAsanaName =
                    document.getElementById("swal-asana-name").value;
                const scheduledDate =
                    document.getElementById("swal-date").value;
                const scheduledTime =
                    document.getElementById("swal-time").value;

                // Placeholder for API call or any asynchronous action
                // sending a post request

                try {
                    const response = await fetch("/api/schedule", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            asanaName: scheduledAsanaName,
                            date: scheduledDate,
                            time: scheduledTime,
                        }),
                    });
                    const data = await response.json();
                    if (data.success) {
                        window.location.reload();
                        return data;
                    } else {
                        throw new Error(data.message);
                    }
                } catch (error) {
                    console.error("Error scheduling exercise: ", error);
                }
            },
        });
        if (result.isConfirmed) {
            const newScheduledExercise = result.value;
            setScheduledExercises([
                ...scheduledExercises,
                newScheduledExercise,
            ]);
            Swal.fire({
                title: "Exercise Scheduled!",
                text: `Scheduled ${newScheduledExercise.asanaName} for ${newScheduledExercise.date} at ${newScheduledExercise.time}`,
                icon: "success",
            });
        }
    };

    return (
        <div className="w-[45%] h-[400px] bg-[#546B54] rounded-lg">
            <div className="flex items-center justify-between px-8 pt-4 header">
                <h1 className="text-2xl font-semibold text-gray-100">
                    My Schedule
                </h1>
                <button
                    className="text-sm text-gray-100 hover:cursor-pointer"
                    onClick={() =>
                        setShowAllScheduledExercises(!showAllScheduledExercises)
                    }>
                    {showAllScheduledExercises ? "View Less" : "View All"}
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[90%] below-container gap-2">
                {!showAllScheduledExercises ? (
                    <div className="">
                        {scheduledExercises.length > 0 ? (
                            scheduledExercises
                                .slice(-3)
                                .map((exercise, index) => (
                                    <ScheduledExercisesList
                                        exercise={exercise}
                                        key={index}
                                        onDelete={handleDeleteExercise}
                                    />
                                ))
                        ) : (
                            <p>No Exercise Scheduled Yet</p>
                        )}
                        <button
                            onClick={handleScheduleExercise}
                            className="px-4 py-2 mt-8 font-medium bg-[#3d503d] rounded-md text-gray-50 hover:bg-[#435343] ">
                            Schedule an Exercise
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-full overflow-hidden overflow-y-scroll p-4 schedule-card-container flex flex-wrap items-center justify-center gap-4">
                        {scheduledExercises.length > 0 ? (
                            scheduledExercises.map((exercise, index) => (
                                <Bounce key={index}>
                                    <ScheduledExercisesCard
                                        exercise={exercise}
                                        key={index}
                                        onDelete={handleDeleteExercise}
                                    />
                                </Bounce>
                            ))
                        ) : (
                            <p className="w-full text-center">
                                No Exercise Scheduled Yet
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Schedule;
