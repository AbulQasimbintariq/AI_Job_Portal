"use client";

import Link from "next/link";
import {
    Upload,
    FileText,
    Download,
    Trash2,
    Eye,
    Pencil,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";

const resumes = [
    {
        id: "1",
        title: "Software Engineer Resume",
        createdAt: "Aug 5, 2026",
        status: "Active",
    },
    {
        id: "2",
        title: "Frontend Developer Resume",
        createdAt: "Aug 1, 2026",
        status: "Draft",
    },
];

export default function ResumePage() {
    return (
        <div className= "space-y-8" >
        {/* Page Header */ }

        < div className = "flex flex-col justify-between gap-4 md:flex-row md:items-center" >
            <div>
            <h1 className="text-3xl font-bold text-slate-800" >
                Resume Management
                    </h1>

                    < p className = "mt-2 text-slate-500" >
                        Upload, manage and optimize your resumes with AI.
          </p>
                        </div>

                        < Link
          href = "/dashboard/resume/upload"
    className = "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
        <Upload size={ 20 } />
          Upload Resume
        </Link>
        </div>

    {/* Statistics */ }

    <div className="grid gap-6 md:grid-cols-3" >
        <StatsCard
          title="Total Resumes"
    value = "2"
    icon = {< FileText size = { 24} />}
        />

    < StatsCard
title = "AI Optimized"
value = "1"
icon = {< Pencil size = { 24} />}
        />

    < StatsCard
title = "Downloads"
value = "8"
icon = {< Download size = { 24} />}
        />
    </div>

{/* Resume List */ }

<div className="rounded-2xl bg-white shadow" >
    <div className="border-b p-6" >
        <h2 className="text-xl font-semibold" >
            Your Resumes
                </h2>
                </div>

                < div className = "divide-y" >
                {
                    resumes.map((resume) => (
                        <div
              key= { resume.id }
              className = "flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center"
                        >
                        <div>
                        <h3 className="font-semibold text-slate-800" >
                        { resume.title }
                        </h3>

                    < p className = "mt-1 text-sm text-slate-500" >
                    Created: { resume.createdAt }
                    </p>

                    < span
                  className = {`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${resume.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                    { resume.status }
                    </span>
                    </div>

                    < div className = "flex gap-3" >
                        <button className="rounded-lg border p-2 transition hover:bg-slate-100" >
                            <Eye size={ 18 } />
                                </button>

                                < button className = "rounded-lg border p-2 transition hover:bg-slate-100" >
                                    <Download size={ 18 } />
                                        </button>

                                        < button className = "rounded-lg border p-2 transition hover:bg-slate-100" >
                                            <Pencil size={ 18 } />
                                                </button>

                                                < button className = "rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50" >
                                                    <Trash2 size={ 18 } />
                                                        </button>
                                                        </div>
                                                        </div>
          ))}
</div>

{
    resumes.length === 0 && (
        <div className="p-12 text-center" >
            <FileText
              className="mx-auto mb-4 text-slate-400"
    size = { 50}
        />

        <h3 className="text-lg font-semibold" >
            No resumes found
                </h3>

                < p className = "mt-2 text-slate-500" >
                    Upload your first resume to start using AI features.
    </p>

        < Link
    href = "/dashboard/resume/upload"
    className = "mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
        <Upload size={ 18 } />
              Upload Resume
        </Link>
        </div>
        )
}
</div>
    </div>
  );
}