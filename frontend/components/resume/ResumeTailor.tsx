"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";

export default function ResumeTailor() {
    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [tailoredResume, setTailoredResume] =
        useState("");

    async function tailor() {
        if (!resume || !jobDescription) {
            toast.error(
                "Resume and Job Description are required."
            );
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.tailorResume({
                    resume,
                    jobDescription,
                });

            setTailoredResume(
                response.data.data.tailoredResume ??
                JSON.stringify(
                    response.data.data,
                    null,
                    2
                )
            );

            toast.success(
                "Resume tailored successfully!"
            );
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Tailoring failed."
            );
        } finally {
            setLoading(false);
        }
    }

    function copyResume() {
        navigator.clipboard.writeText(
            tailoredResume
        );

        toast.success("Copied!");
    }

    return (
        <div className= "space-y-6" >

        <textarea
        className="w-full h-52 rounded-lg border p-4"
    placeholder = "Paste Resume"
    value = { resume }
    onChange = {(e) =>
    setResume(e.target.value)
}
      />

    < textarea
className = "w-full h-52 rounded-lg border p-4"
placeholder = "Paste Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
      />

    < button
onClick = { tailor }
disabled = { loading }
className = "bg-blue-600 text-white rounded-lg px-6 py-3"
    >
{
    loading
    ? "Generating..."
        : "Tailor Resume"
}
    </button>

{
    tailoredResume && (
        <div className="space-y-4" >

            <div className="flex justify-between" >

                <h2 className="text-2xl font-bold" >
                    AI Resume
                        </h2>

                        < button
    onClick = { copyResume }
    className = "rounded-lg border px-4 py-2"
        >
        Copy
        </button>

        </div>

        < textarea
    value = { tailoredResume }
    readOnly
    className = "w-full h-[500px] rounded-lg border p-4"
        />

        </div>
      )
}

</div>
  );
}