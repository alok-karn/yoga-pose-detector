import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";

function NavBar() {
    const [data, setData] = useState([]);

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
    // console.log(data);

    return (
        <nav className="w-full h-[60px] mt-4 flex items-center justify-between pl-4">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="logo"
                    />
                    <AvatarFallback className="bg-red-200">U</AvatarFallback>
                </Avatar>
                <div className="left-sub-section">
                    <h2 className="font-medium text-gray-800">Hi Pratham,</h2>
                    <p className="text-sm text-gray-600">Ready to do yoga?</p>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-[150px] py-2 flex gap-2 rounded-md items-center justify-center px-2 bg-[#84CC16] font-medium text-gray-800 hover:bg-[#abdf5d]">
                        Start Yoga <PlayCircle size={24} />{" "}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Choose Level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data.map((category) => (
                        <DropdownMenuItem key={category}>
                            <Link href={`/routine/${category}`}>
                                {category}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}

export default NavBar;
