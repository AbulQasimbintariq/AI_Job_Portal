"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";
import SkillGapCard from "./SkillGapCard";

export default function SkillGapAnalyzer() {
    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function analyze() {
        if (!resume || !jobDescription) {
            toast.error("Resume and Job Description are required.");
            return;
        }

        try {
            setLoading(true);

            const response = await aiService.analyzeSkillGap({
                resume,
                jobDescription,
            });

            setResult(response.data.data);

            toast.success("Skill gap analyzed.");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Analysis failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className= "space-y-6" >

        <textarea
        className="w-full h-48 rounded-lg border p-4"
    placeholder = "Paste Resume"
    value = { resume }
    onChange = {(e) => setResume(e.target.value)
}
      />

    < textarea
className = "w-full h-48 rounded-lg border p-4"
placeholder = "Paste Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
      />

    < button
onClick = { analyze }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Analyzing..."
        : "Analyze Skill Gap"
}
    </button>

{
    result && (
        <div className="grid gap-6 md:grid-cols-2" >

            <SkillGapCard
            title="Missing Skills"
    items = { result.missingSkills ?? [] }
        />

        <SkillGapCard
            title="Recommended Learning"
    items = { result.recommendations ?? [] }
        />

        </div>
      )
}
</div>
  );
}
