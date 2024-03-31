import Link from "next/link";
import { useEffect, useState } from "react";

const Color = [
    { id: 0, color: "#9FFB66" },
    { id: 1, color: "#8FCF8D" },
    { id: 2, color: "#97BFC2" },
    { id: 3, color: "#F9D4D4" },
    { id: 4, color: "#DDE5C7" },
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function CollectionItem({ category, color, length }) {
    return (
        <Link
            href={`/routine/${category}`}
            className="flex items-center justify-between px-4 header w-[90%] py-4 rounded-md"
            style={{ backgroundColor: color }}>
            <h1 className="px-4 font-medium text-gray-800 text-md">
                {category}
            </h1>
            <p className="text-sm font-medium text-gray-600 hover:cursor-pointer">
                {length ? length + " asanas" : 0 + " asana"}
            </p>
        </Link>
    );
}

function Collections() {
    const [data, setData] = useState([]);
    const [poses, setPoses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/getyogapose");
                const data = await response.json();

                if (data.success) {
                    const uniqueCategories = Array.from(
                        new Set(data.data.map((pose) => pose.category))
                    ).filter((category) => category !== "undefined");
                    setData(uniqueCategories);
                }
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };
        fetchData();
    }, []);

    // console.log("Data from Collection: ", data);

    useEffect(() => {
        const fetchPoses = async () => {
            try {
                const response = await fetch("/api/getyogapose");
                const data = await response.json();

                if (data.success) {
                    setPoses(data.data);
                }
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };
        fetchPoses();
    }, []);

    // console.log("Poses from Collection: ", poses);

    function returnLengthOfPoses(category) {
        const filteredPoses = poses.filter(
            (pose) => pose.category === category
        );
        return filteredPoses.length;
    }

    const shuffledColors = shuffleArray(Color);

    return (
        <div className="w-[45%] h-[400px] bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between px-8 pt-4 mb-4 header">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Our Collection
                </h1>
                <p className="text-sm text-gray-400 hover:cursor-pointer">
                    View All
                </p>
            </div>
            <div className="flex flex-col items-center w-full h-[90%] below-container gap-3">
                {data.map((category, index) => (
                    <CollectionItem
                        key={category}
                        category={category}
                        // color={
                        //     Color[Math.floor(Math.random() * Color.length)]
                        //         .color
                        // }
                        color={
                            shuffledColors[index % shuffledColors.length].color
                        }
                        length={returnLengthOfPoses(category)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Collections;
