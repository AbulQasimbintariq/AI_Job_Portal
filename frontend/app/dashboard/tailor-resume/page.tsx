"use client";

import { useState } from "react";
import { Wand2, Sparkles, Copy, Download } from "lucide-react";

export default function TailorResumePage() {
    const [jobDescription, setJobDescription] = useState("");
    const [tailoredResume, setTailoredResume] = useState("");

    const handleTailorResume = () => {
        // TODO:
        // Replace with backend API call
        // POST /api/ai/tailor-resume

        setTailoredResume(
            "Your AI-tailored resume will appear here after integrating the backend."
        );
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(tailoredResume);
        alert("Tailored resume copied!");
    };

    return (
        <div className= "space-y-8" >

        {/* Header */ }

        < div >
        <h1 className="text-3xl font-bold text-slate-800" >
            AI Resume Tailoring
                </h1>

                < p className = "mt-2 text-slate-500" >
                    Optimize your resume for a specific job description using AI.
    </p>
        </div>

    {/* Input */ }

    <div className="rounded-2xl bg-white p-6 shadow" >

        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold" >
            <Sparkles className="text-blue-600" size = { 22} />
                Job Description
                    </h2>

                    < textarea
    value = { jobDescription }
    onChange = {(e) => setJobDescription(e.target.value)
}
placeholder = "Paste the complete job description here..."
rows = { 12}
className = "w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
    />

    <button
          onClick={ handleTailorResume }
disabled = {!jobDescription.trim()}
className = "mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
    <Wand2 size={ 18 } />
          Tailor Resume
    </button>

    </div>

{/* Output */ }

<div className="rounded-2xl bg-white p-6 shadow" >

    <div className="mb-5 flex items-center justify-between" >

        <h2 className="text-xl font-semibold" >
            AI Tailored Resume
                </h2>

{
    tailoredResume && (
        <div className="flex gap-3" >

            <button
                onClick={ copyToClipboard }
    className = "flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
        <Copy size={ 18 } />
    Copy
        </button>

        < button
    className = "flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
        <Download size={ 18 } />
    Download
        </button>

        </div>
          )
}

</div>

{
    tailoredResume ? (
        <div className= "rounded-xl bg-slate-50 p-5 whitespace-pre-wrap leading-7" >
        { tailoredResume }
        </div>
        ) : (
        <div className= "rounded-xl border-2 border-dashed border-slate-300 py-20 text-center" >

        <Sparkles
              size={ 48 }
    className = "mx-auto mb-4 text-slate-400"
        />

        <h3 className="text-lg font-semibold" >
            No tailored resume yet
                </h3>

                < p className = "mt-2 text-slate-500" >
                    Paste a job description and click
                        < strong > Tailor Resume </strong>
              to generate an AI - optimized resume.
            </p>

        </div>
        )
}

</div>

    </div>
  );
}