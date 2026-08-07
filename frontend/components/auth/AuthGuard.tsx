"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { storage } from "@/lib/storage";

interface Props {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
    const router = useRouter();

    useEffect(() => {
        const token = storage.getToken();

        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    if (!storage.getToken()) {
        return (
            <div className= "flex h-screen items-center justify-center" >
            <p className="text-lg" > Checking authentication...</p>
                </div>
    );
    }

    return <>{ children } </>;
}