"use client";

import { useState } from "react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";

export default function CoverLetterGenerator() {
    const [resume, setResume] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [position, setPosition] = useState("");

    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");

    async function generate() {
        if (
            !resume ||
            !jobDescription ||
            !companyName ||
            !position
        ) {
            toast.error("Please complete all fields.");
            return;
        }

        try {
            setLoading(true);

            const response =
                await aiService.generateCoverLetter({
                    resume,
                    jobDescription,
                    companyName,
                    position,
                });

            const result = response.data.data;

            setCoverLetter(
                result.coverLetter ??
                JSON.stringify(result, null, 2)
            );

            toast.success("Cover letter generated.");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Generation failed."
            );
        } finally {
            setLoading(false);
        }
    }

    function copy() {
        navigator.clipboard.writeText(coverLetter);
        toast.success("Copied.");
    }

    function download() {
        const blob = new Blob([coverLetter], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "cover-letter.txt";

        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className= "space-y-5" >

        <input
        className="w-full rounded-lg border p-3"
    placeholder = "Company Name"
    value = { companyName }
    onChange = {(e) =>
    setCompanyName(e.target.value)
}
      />

    < input
className = "w-full rounded-lg border p-3"
placeholder = "Position"
value = { position }
onChange = {(e) =>
setPosition(e.target.value)
        }
      />

    < textarea
className = "w-full h-44 rounded-lg border p-3"
placeholder = "Resume"
value = { resume }
onChange = {(e) =>
setResume(e.target.value)
        }
      />

    < textarea
className = "w-full h-44 rounded-lg border p-3"
placeholder = "Job Description"
value = { jobDescription }
onChange = {(e) =>
setJobDescription(e.target.value)
        }
      />

    < button
onClick = { generate }
disabled = { loading }
className = "rounded-lg bg-blue-600 px-6 py-3 text-white"
    >
{
    loading
    ? "Generating..."
        : "Generate Cover Letter"
}
    </button>

{
    coverLetter && (
        <div className="space-y-4" >

            <div className="flex gap-3" >

                <button
              onClick={ copy }
    className = "rounded border px-4 py-2"
        >
        Copy
        </button>

        < button
    onClick = { download }
    className = "rounded border px-4 py-2"
        >
        Download
        </button>

        </div>

        < textarea
    readOnly
    value = { coverLetter }
    className = "h-[500px] w-full rounded-lg border p-4"
        />

        </div>
      )
}

</div>
  );
}