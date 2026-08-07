"use client";

import { useState } from "react";
import { toast } from "sonner";
import aiService from "@/services/ai.service";
import JobRecommendationCard from "./JobRecommendationCard";
import { unknown } from "zod";

export default function JobRecommendationEngine() {
    const [resume, setResume] = useState("");
    const [jobs, setJobs] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [recommendations, setRecommendations] =
        useState<any[]>([]);

    async function generateRecommendations() {
        if (!resume || !jobs) {
            toast.error("Fill all fields.");
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.recommendJobs({
                    resume,
                    jobs : [],
                });

            const data = response.data.data;

            if (Array.isArray(data)) {
                setRecommendations(data);
            } else if (Array.isArray(data.recommendations)) {
                setRecommendations(data.recommendations);
            } else {
                setRecommendations([]);
            }

            toast.success("Recommendations generated.");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className= "space-y-6" >

        <textarea
        className="h-56 w-full rounded-lg border p-4"
    placeholder = "Paste Resume"
    value = { resume }
    onChange = {(e) =>
    setResume(e.target.value)
}
      />

    < textarea
className = "h-56 w-full rounded-lg border p-4"
placeholder = "Paste Job Listings (or JSON)"
value = { jobs }
onChange = {(e) =>
setJobs(e.target.value)
        }
      />

    < button
onClick = { generateRecommendations }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Generating..."
        : "Recommend Jobs"
}
    </button>

    < div className = "grid gap-6 lg:grid-cols-2" >
    {
        recommendations.map((job, index) => (
            <JobRecommendationCard
            key= { index }
            job = { job }
            />
        ))
    }
        </div>

        </div>
  );
}