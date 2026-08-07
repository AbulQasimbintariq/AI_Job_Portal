"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";
import AnalysisResult from "./AnalysisResult";

export default function ResumeAnalyzer() {
    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function analyze() {
        if (!resume || !jobDescription) {
            toast.error("Please enter resume and job description.");
            return;
        }

        try {
            setLoading(true);

            const response = await aiService.analyzeResume({
                resume,
                jobDescription,
            });

            setResult(response.data.data);

            toast.success("Analysis completed");
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
        value={ resume }
    onChange = {(e) =>
    setResume(e.target.value)
}
placeholder = "Paste Resume..."
className = "w-full rounded-lg border p-4 h-52"
    />

    <textarea
        value={ jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
placeholder = "Paste Job Description..."
className = "w-full rounded-lg border p-4 h-52"
    />

    <button
        onClick={ analyze }
disabled = { loading }
className = "bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
{
    loading
    ? "Analyzing..."
        : "Analyze Resume"
}
    </button>

{
    result && (
        <AnalysisResult data={ result } />
      )
}
</div>
  );
}