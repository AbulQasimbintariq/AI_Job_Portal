"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";

import CareerAdviceCard from "./CareerAdviceCard";

export default function CareerAdvisor() {
    const [resume, setResume] = useState("");
    const [careerGoal, setCareerGoal] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    async function generateAdvice() {
        if (!resume || !careerGoal) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.generateCareerAdvice({
                    resume,
                    careerGoal,
                });

            setResult(response.data.data);

            toast.success(
                "Career advice generated."
            );
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Generation failed."
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

    < input
className = "w-full rounded-lg border p-4"
placeholder = "Career Goal"
value = { careerGoal }
onChange = {(e) =>
setCareerGoal(e.target.value)
        }
      />

    < button
onClick = { generateAdvice }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Generating..."
        : "Generate Career Advice"
}
    </button>

{
    result && (
        <div className="grid gap-6" >

            <CareerAdviceCard
            title="Career Advice"
    content = {
        result.advice ??
            "No advice available."
    }
        />

        <CareerAdviceCard
            title="Recommended Skills"
    content = {
        result.skills ?? []
    }
        />

        <CareerAdviceCard
            title="Recommended Certifications"
    content = {
        result.certifications ?? []
    }
        />

        <CareerAdviceCard
            title="Learning Roadmap"
    content = {
        result.roadmap ?? []
    }
        />

        <CareerAdviceCard
            title="Suggested Job Roles"
    content = {
        result.jobRoles ?? []
    }
        />

        </div>
      )
}

</div>
  );
}