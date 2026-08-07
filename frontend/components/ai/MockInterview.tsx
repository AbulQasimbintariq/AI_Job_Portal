"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";
import InterviewFeedback from "./InterviewFeedback";

export default function MockInterview() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<any>(null);

    async function evaluate() {
        if (
            !question ||
            !answer ||
            !jobDescription
        ) {
            toast.error("Please complete all fields.");
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.evaluateInterviewAnswer({
                    question,
                    answer,
                    jobDescription,
                });

            setResult(response.data.data);

            toast.success("Answer evaluated.");
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
        className="h-28 w-full rounded-lg border p-4"
    placeholder = "Interview Question"
    value = { question }
    onChange = {(e) =>
    setQuestion(e.target.value)
}
      />

    < textarea
className = "h-48 w-full rounded-lg border p-4"
placeholder = "Your Answer"
value = { answer }
onChange = {(e) =>
setAnswer(e.target.value)
        }
      />

    < textarea
className = "h-40 w-full rounded-lg border p-4"
placeholder = "Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
      />

    < button
onClick = { evaluate }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Evaluating..."
        : "Evaluate Answer"
}
    </button>

{
    result && (
        <InterviewFeedback result={ result } />
      )
}

</div>
  );
}