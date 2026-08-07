"use client";

import { useState } from "react";
import { Upload, Brain, FileText } from "lucide-react";

export default function ResumeAnalyzerPage() {
    const [resumeText, setResumeText] = useState("");
    const [analysis, setAnalysis] = useState("");

    const analyzeResume = () => {
        // TODO:
        // Replace with backend API
        // POST /api/ai/analyze-resume

        setAnalysis(`
ATS Score: 85%

Strengths
• Strong technical skills
• Good project experience
• Professional formatting

Improvements
• Add more measurable achievements
• Include additional industry keywords
• Expand leadership experience
    `);
    };

    return (
        <div className= "space-y-8" >
        {/* Header */ }

        < div >
        <h1 className="text-3xl font-bold text-slate-800" >
            AI Resume Analyzer
                </h1>

                < p className = "mt-2 text-slate-500" >
                    Analyze your resume and receive AI - powered feedback.
        </p>
                        </div>

    {/* Resume Input */ }

    <div className="rounded-2xl bg-white p-6 shadow" >

        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold" >
            <FileText className="text-blue-600" />
                Resume Content
                    </h2>

                    < textarea
    rows = { 14}
    value = { resumeText }
    onChange = {(e) => setResumeText(e.target.value)
}
placeholder = "Paste your resume here..."
className = "w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
    />

    <button
          onClick={ analyzeResume }
disabled = {!resumeText.trim()}
className = "mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
    >
    <Brain size={ 18 } />
          Analyze Resume
    </button>

    </div>

{/* Results */ }

<div className="rounded-2xl bg-white p-6 shadow" >

    <h2 className="mb-5 text-xl font-semibold" >
        Analysis Result
            </h2>

{
    analysis ? (
        <pre className= "whitespace-pre-wrap rounded-xl bg-slate-50 p-5 leading-7" >
        { analysis }
        </pre>
        ) : (
        <div className= "rounded-xl border-2 border-dashed border-slate-300 py-20 text-center" >

        <Upload
              size={ 48 }
    className = "mx-auto mb-4 text-slate-400"
        />

        <h3 className="text-lg font-semibold" >
            No analysis yet
                </h3>

                < p className = "mt-2 text-slate-500" >
                    Paste your resume and click
                        < strong > Analyze Resume </strong>.
                            </p>

                            </div>
        )
}

</div>
    </div>
  );
}