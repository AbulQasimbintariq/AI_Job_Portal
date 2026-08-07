import { ReactNode } from "react";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    color?: string;
}

export default function StatsCard({
    title,
    value,
    icon,
    color = "bg-blue-600",
}: StatsCardProps) {
    return (
        <div className= "rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl" >
        <div className="flex items-center justify-between" >

            <div>

            <p className="text-sm text-gray-500" >
                { title }
                </p>

                < h2 className = "mt-2 text-3xl font-bold" >
                    { value }
                    </h2>

                    </div>

                    < div
    className = {`flex h-14 w-14 items-center justify-center rounded-xl text-white ${color}`
}
        >
    { icon }
    </div>

    </div>
    </div>
  );
}