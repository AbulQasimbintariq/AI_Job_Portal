"use client";

import { ReactNode } from "react";

interface Props {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: Props) {
    return (
        <div className= "min-h-screen flex items-center justify-center bg-slate-100" >
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8" >
            <h1 className="text-3xl font-bold text-center" >
                { title }
                </h1>

                < p className = "text-gray-500 text-center mt-2 mb-8" >
                    { subtitle }
                    </p>

    { children }
    </div>
        </div>
    );
}