"use client";

import UserProfileCard from "@/components/dashboard/UserProfileCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { User, FileText, Brain, BriefcaseBusiness } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className= "space-y-8" >

        {/* Page Header */ }

        < div >
        <h1 className="text-3xl font-bold text-slate-800" >
            My Profile
                </h1>

                < p className = "mt-2 text-slate-500" >
                    View and manage your account information.
        </p>
                        </div>

    {/* User Information */ }

    <UserProfileCard />

    {/* Statistics */ }

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" >

        <StatsCard
          title="Resumes"
    value = "0"
    icon = {< FileText size = { 24} />}
        />

    < StatsCard
title = "AI Analyses"
value = "0"
icon = {< Brain size = { 24} />}
        />

    < StatsCard
title = "Job Matches"
value = "0"
icon = {< BriefcaseBusiness size = { 24} />}
        />

    < StatsCard
title = "Profile"
value = "100%"
icon = {< User size = { 24} />}
        />

    </div>

    </div>
  );
}