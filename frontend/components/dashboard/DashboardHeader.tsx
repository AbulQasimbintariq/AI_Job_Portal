"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Menu } from "lucide-react";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import SearchBar from "@/components/dashboard/SearchBar";
import NotificationDropdown from "@/components/dashboard/NotificationDropdown";
import UserMenu from "@/components/dashboard/UserMenu";

export default function DashboardHeader() {
    const { user, loading } = useCurrentUser();

    const [showNotifications, setShowNotifications] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <header className= "sticky top-0 z-30 mb-8 flex h-20 items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 shadow-sm" >

        {/* Left Section */ }

        < div className = "flex items-center gap-4" >

            {/* Mobile Sidebar Button (Future) */ }

                    < div >
                        < p className = "mt-1 text-sm text-slate-500" >
                        {
                            loading
                            ? "Loading..."
                                : `Welcome back, ${user?.name}! 👋`
                        }
                            </p>
                            </div>

                            </div>

    {/* Right Section */ }

    <div className="flex items-center gap-4" >

        {/* Search */ }

        < div className = "hidden lg:block" >
            <SearchBar
            onSearch={
        (query) => {
            console.log("Search:", query);

            // Future:
            // router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
        }
    }
          />
        </div>

    {/* Notifications */ }

    <div
          className="relative"
    ref = { notificationRef }
        >
        <button
            onClick={
        () =>
            setShowNotifications(
                !showNotifications
            )
    }
    className = "relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100"
        >
        <Bell size={ 20 } />

    {/* Notification Badge */ }

    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

    {
        showNotifications && (
            <NotificationDropdown />
        )
    }
    </div>

    {/* User Menu */ }

    <UserMenu />

        </div>

        </header>
  );
}