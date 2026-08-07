"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
    LayoutDashboard,
    Upload,
    Brain,
    FilePenLine,
    FileText,
    MessageSquare,
    BriefcaseBusiness,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { storage } from "@/lib/storage";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface MenuItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Upload Resume",
        href: "/dashboard/resume",
        icon: Upload,
    },
    {
        title: "Resume Analyzer",
        href: "/dashboard/resume-analyzer",
        icon: Brain,
    },
    {
        title: "Tailor Resume",
        href: "/dashboard/tailor-resume",
        icon: FilePenLine,
    },
    {
        title: "Cover Letter",
        href: "/dashboard/cover-letter",
        icon: FileText,
    },
    {
        title: "Mock Interview",
        href: "/dashboard/mock-interview",
        icon: MessageSquare,
    },
    {
        title: "Job Matches",
        href: "/dashboard/job-matches",
        icon: BriefcaseBusiness,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const { user, loading } = useCurrentUser();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        storage.removeToken();
        router.replace("/login");
    };

    return (
        <aside
      className= {`flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${collapsed ? "w-20" : "w-72"
            }`
}
    >
{/* ===========================
          Logo
      =========================== */}

    < div className = "flex items-center justify-between border-b border-slate-200 p-5" >
        {!collapsed && (
            <Link href="/dashboard" >
                <div>
                <h1 className="text-2xl font-bold text-blue-600" >
                    HireIQ AI
                        </h1>

                        < p className = "text-xs text-slate-500" >
                            AI Job Portal
                                </p>
                                </div>
                                </Link>
        )}

<button
          onClick={ () => setCollapsed(!collapsed) }
className = "rounded-lg p-2 transition hover:bg-slate-100"
    >
    {
        collapsed?(
            <ChevronRight size = { 20} />
          ): (
                <ChevronLeft size = { 20 } />
          )}
</button>
    </div>

{/* ===========================
          User Section
      =========================== */}

{
    !collapsed && (
        <div className="border-b border-slate-200 p-5" >
            <div className="flex items-center gap-3" >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white" >
                {
                    loading
                    ? "..."
                        : user?.name?.charAt(0).toUpperCase() ?? "U"
                }
                    </div>

                    < div className = "min-w-0" >

                        <h2 className="truncate font-semibold text-slate-800" >
                            { loading? "Loading...": user?.name }
                            </h2>

                            < p className = "truncate text-xs capitalize text-slate-500" >
                                { loading? "": user?.role }
                                </p>

                                </div>

                                </div>
                                </div>
      )
}

{/* ===========================
          Navigation
      =========================== */}

<nav className="flex-1 overflow-y-auto p-4" >

    <ul className="space-y-2" >

    {
        menuItems.map((item) => {
            const Icon = item.icon;

            const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

            return (
                <li key= { item.href } >
                <Link
                  href={ item.href }
            className = {`flex items-center rounded-xl px-4 py-3 transition-all duration-200 ${active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`
        }
                >
            <Icon size={ 20} />

        {!collapsed && (
            <span className="ml-3 font-medium" >
            { item.title }
        </span>
        )
    }
        </Link>
        </li>
            );
          })}

</ul>

    </nav>

{/* ===========================
          Footer
      =========================== */}

<div className="border-t border-slate-200 p-4" >

    <button
          onClick={ handleLogout }
className = "flex w-full items-center justify-center rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
    >
    <LogOut size={ 20 } />

{
    !collapsed && (
        <span className="ml-3" >
            Logout
            </span>
          )
}
</button>

    </div>
    </aside>
  );
}