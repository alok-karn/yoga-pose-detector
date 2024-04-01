import SkeletonYogaPoseLoader from "@/components/SkeletonYogaPoseLoader";
import YogaPoseContainer from "@/components/YogaPoseContainer";
import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bounce } from "react-awesome-reveal";

export default function Category({ poses }) {
    const { category } = poses[0];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // for 2 seconds
    }, []);

    const SkeletonYoagCount = new Array(6).fill(null);

    return (
        <div className="px-12">
            <div className="header w-full h-[30px] py-4 flex items-center justify-between mt-6">
                <h1 className="text-lg font-bold text-gray-800">{category}</h1>
                <Link href={"/"} className="text-sm font-medium">
                    {"<"} &nbsp; Back to DashBoard
                </Link>
            </div>
            <h1 className="mt-4 mb-4 text-2xl font-medium text-gray-800">
                Total No of Asana: {poses.length}
            </h1>

            {isLoading ? (
                <div className="flex flex-wrap items-center justify-center w-auto h-auto gap-8">
                    {SkeletonYoagCount.map((_, key) => (
                        <div key={key}>
                            <SkeletonYogaPoseLoader />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center w-full h-auto gap-10">
                    {poses.map((pose) => (
                        <Bounce key={pose._id}>
                            <YogaPoseContainer pose={pose} />
                        </Bounce>
                    ))}
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { category } = context.query;
    await mongooseConnect();
    const poses = await YogaPose.find({ category });
    
    return {
        props: {
            poses: JSON.parse(JSON.stringify(poses)),
        },
    };
}
