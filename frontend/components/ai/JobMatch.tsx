"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";
import MatchScoreCard from "./MatchScoreCard";

export default function JobMatch() {
    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<any>(null);

    async function calculate() {
        if (!resume || !jobDescription) {
            toast.error("All fields are required.");
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.generateJobMatchScore({
                    resume,
                    jobDescription,
                });

            setResult(response.data.data);

            toast.success("Score calculated.");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Calculation failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className= "space-y-6" >

        <textarea
        className="h-48 w-full rounded-lg border p-4"
    placeholder = "Resume"
    value = { resume }
    onChange = {(e) =>
    setResume(e.target.value)
}
      />

    < textarea
className = "h-48 w-full rounded-lg border p-4"
placeholder = "Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
      />

    < button
onClick = { calculate }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Calculating..."
        : "Calculate Match Score"
}
    </button>

{
    result && (
        <div className="space-y-8" >

            <MatchScoreCard
            score={ result.matchScore ?? 0 }
          />

        < div className = "grid gap-6 md:grid-cols-2" >

            <div className="rounded-xl border p-6" >

                <h3 className="mb-4 text-xl font-semibold" >
                    Matching Skills
                        </h3>

                        < ul className = "space-y-2" >
                            {(result.matchedSkills ?? []).map(
                                (
                                    skill: string,
                                    index: number
                                ) => (
                                    <li key= { index } >
                      ✅ { skill }
                                </li>
                            )
                )
}
</ul>

    </div>

    < div className = "rounded-xl border p-6" >

        <h3 className="mb-4 text-xl font-semibold" >
            Missing Skills
                </h3>

                < ul className = "space-y-2" >
                    {(result.missingSkills ?? []).map(
                        (
                            skill: string,
                            index: number
                        ) => (
                            <li key= { index } >
                      ❌ { skill }
                        </li>
                    )
                )}
</ul>

    </div>

    </div>

    < div className = "rounded-xl border p-6" >

        <h3 className="mb-4 text-xl font-semibold" >
            AI Suggestions
                </h3>

                < ul className = "space-y-3" >
                    {(result.suggestions ?? []).map(
                        (
                            item: string,
                            index: number
                        ) => (
                            <li key= { index } >
                    • { item }
                        </li>
                    )
              )}
</ul>

    </div>

    </div>
      )}

</div>
  );
}