"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader"

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className= "min-h-screen bg-slate-100" >

        {/* ===========================
          Mobile Overlay
      =========================== */}

    {
        sidebarOpen && (
            <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick = {() => setSidebarOpen(false)
    }
        />
      )
}
{/* ===========================
          Sidebar  =========================== */}
<div
    className={
    ` fixed inset-y-0 left-0 z-50
          transform transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
    <Sidebar />
    </div>
{/* ===========================
          Main Content
      =========================== */}

<div className="lg:ml-72" >

    {/* Mobile Top Bar */ }

    < div className = "sticky top-0 z-30 flex items-center justify-between border-b bg-white p-4 shadow-sm lg:hidden" >

        <button
            onClick={ () => setSidebarOpen(true) }
className = "rounded-lg border p-2"
    >
    <Menu size={ 22 } />
        </button>

        < h2 className = "text-xl font-bold text-blue-600" >
            HireIQ AI
                </h2>

                < div />
                </div>

{/* Desktop Header */ }

<div className="p-6" >

    <DashboardHeader />

    < main className = "mt-6" >

        { children }

        </main>

        </div>

        </div>

{/* ===========================
          Mobile Close Button
      =========================== */}

{
    sidebarOpen && (
        <button
          onClick={ () => setSidebarOpen(false) }
    className = "fixed right-5 top-5 z-60 rounded-full bg-white p-2 shadow lg:hidden"
        >
        <X size={ 22 } />
            </button>
      )
}

</div>
  );
}