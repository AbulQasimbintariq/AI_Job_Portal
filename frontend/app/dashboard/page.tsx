"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UserProfileCard from "@/components/dashboard/UserProfileCard";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";

import {
    FileText,
    Brain,
    Briefcase,
    FileCheck,
} from "lucide-react";



export default function DashboardPage() {
    const [stats, setStats] = useState({
        resumes: 0,
        analyses: 0,
        jobMatches: 0,
        coverLetters: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await dashboardService.getStats();
                setStats(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <main className= "min-h-screen bg-slate-100 p-6" >

        <div className="mx-auto max-w-7xl space-y-8" >

        {/* ===========================
            Dashboard Header
        =========================== */}

            < div >
            <h1 className="text-4xl font-bold text-slate-900" >
                Dashboard
                </h1>

                < p className = "mt-2 text-slate-600" >
                    Welcome back! Here's an overview of your AI Job Portal.
                        </p>
                        </div>

    {/* ===========================
            Statistics Cards
        =========================== */}

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" >

        <StatsCard
            title="Resumes"
    value = { stats.resumes }
    icon = {< FileText size = { 28} />}
color = "bg-blue-600"
    />

    <StatsCard
            title="AI Analyses"
value = { stats.analyses }
icon = {< Brain size = { 28} />}
color = "bg-purple-600"
    />

    <StatsCard
            title="Job Matches"
value = { stats.jobMatches }
icon = {< Briefcase size = { 28} />}
color = "bg-green-600"
    />

    <StatsCard
            title="Cover Letters"
value = { stats.coverLetters }
icon = {< FileCheck size = { 28} />}
color = "bg-orange-600"
    />

    </div>

{/* ===========================
            Quick Actions
        =========================== */}

<QuickActions />

{/* ===========================
            Bottom Section
        =========================== */}

<div className="grid gap-8 lg:grid-cols-3" >

    {/* Left Side */ }

    < div className = "lg:col-span-2" >

        <RecentActivity />

        </div>

{/* Right Side */ }

<UserProfileCard
            name="Abul Qasim"
        email = "abul@example.com"
        role = "Candidate"
        joinedAt = "August 2026"
    />

    </div>

    </div>

    </main>
  );
}