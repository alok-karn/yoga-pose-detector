import Collections from "@/components/Collections";
import NavBar from "@/components/NavBar";
import ProgressBox from "@/components/ProgressBox";
import Schedule from "@/components/Schedule";
import dynamic from "next/dynamic";

// index is a dashboard page

const DynamicComponentWithNoSSR = dynamic(
    () => import("@/components/Activity"),
    { ssr: false }
);

export default function Home() {
    return (
        <div className="flex flex-col gap-8 px-8 pb-2">
            <NavBar />
            {/* container */}
            <div className="w-full h-[110vh] below-section flex flex-col">
                <div className="flex items-center justify-around upperHalf">
                    <ProgressBox />
                    <DynamicComponentWithNoSSR />
                </div>
                <div className="flex items-center justify-around mt-10 lower-half">
                    <Schedule />
                    <Collections />
                </div>
            </div>
        </div>
    );
}
