"use client";


import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ChevronDown,
    User,
    Settings,
    LogOut,
    Moon,
    Sun,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { storage } from "@/lib/storage";


export default function UserMenu() {
    const { theme, setTheme } = useTheme();
    const { user, loading } = useCurrentUser();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    const handleLogout = () => {
        storage.removeToken();

        router.push("/login");
    };

    return (
        <div
      className= "relative"
    ref = { menuRef }
        >
        <button
        onClick={ () => setOpen(!open) }
    className = "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100"
        >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white" >
            { initials }
            </div>

            < div className = "hidden text-left md:block" >
                <p className="font-semibold text-slate-800" >
                    { loading? "Loading...": user?.name }
                    </p>

                    < p className = "text-xs capitalize text-slate-500" >
                        { loading? "": user?.role }
                        </p>
                        </div>

                        < ChevronDown
    size = { 18}
    className = {`transition ${open ? "rotate-180" : ""
        }`
}
        />
    </button>

{
    open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" >

            {/* User Info */ }

            < div className = "border-b border-slate-200 p-5" >

                <p className="font-semibold text-slate-800" >
                    { loading? "Loading...": user?.name }
                    </p>

                    < p className = "mt-1 text-sm text-slate-500" >
                        { loading? "": user?.email }
                        </p>

                        </div>

    {/* Menu */ }

    <div className="py-2" >

        <Link
              href="/dashboard/profile"
    className = "flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
    onClick = {() => setOpen(false)
}
            >
    <User size={ 18 } />
              My Profile
    </Link>

    < Link
href = "/dashboard/settings"
className = "flex items-center gap-3 px-5 py-3 transition hover:bg-slate-100"
onClick = {() => setOpen(false)}
            >
    <Settings size={ 18 } />
Settings
    </Link>    
    <button
        onClick = {() =>setTheme(theme === "dark" ? "light" : "dark")
                    }
        className = "flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-slate-100"
    >
    { theme === "dark" ? (
        <>
        <Sun size= { 18} />
Light Mode
    </>
  ) : (
    <>
    <Moon size= { 18} />
    Dark Mode
        </>
  )}
</button>

    </div>

{/* Footer */ }

<div className="border-t border-slate-200" >

    <button
              onClick={ handleLogout }
className = "flex w-full items-center gap-3 px-5 py-4 text-left text-red-600 transition hover:bg-red-50"
    >
    <LogOut size={ 18 } />
Logout
    </button>

    </div>

    </div>
      )}
</div>
  );
}