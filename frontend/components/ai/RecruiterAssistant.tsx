"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";

import CandidateEvaluationCard from "./CandidateEvaluationCard";

export default function RecruiterAssistant() {

    const [resume, setResume] = useState("");

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    async function evaluateCandidate() {

        if (!resume || !jobDescription) {
            toast.error("Fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const response =
                await aiService.evaluateCandidate({
                    resume,
                    jobDescription,
                });

            setResult(response.data.data);

            toast.success(
                "Candidate evaluated successfully."
            );

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ??
                "Evaluation failed."
            );

        } finally {

            setLoading(false);

        }

    }

    return (
        <div className= "space-y-6" >

        <textarea
                className="h-56 w-full rounded-lg border p-4"
    placeholder = "Paste Candidate Resume"
    value = { resume }
    onChange = {(e) =>
    setResume(e.target.value)
}
            />

    < textarea
className = "h-56 w-full rounded-lg border p-4"
placeholder = "Paste Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
                }
            />

    < button
onClick = { evaluateCandidate }
disabled = { loading }
className = "rounded-lg bg-indigo-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Evaluating..."
        : "Evaluate Candidate"
}
    </button>

{
    result && (
        <CandidateEvaluationCard
                    result={ result }
                />
            )
}

</div>
    );
}