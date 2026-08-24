"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import axios from "axios";
import {
    FiUploadCloud,
    FiFileText,
    FiX,
    FiCheckCircle,
    FiAlertCircle,
    FiArrowLeft,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ResumeUploadPage() {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB

    const validateFile = (selectedFile: File) => {
        setError("");
        setSuccess("");

        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Only PDF and DOCX files are supported.");
            return false;
        }

        if (selectedFile.size > maxSize) {
            setError("File size must be less than 5MB.");
            return false;
        }

        return true;
    };

    const handleFile = (selectedFile: File) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files?.[0];

        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError("");
        setSuccess("");
    };

    const uploadResume = async () => {
        if (!file) {
            setError("Please select a resume first.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setSuccess("");

            const formData = new FormData();
            formData.append("resume", file);

            const response = await axios.post(
                `${API_URL}/api/upload/resume`,
                formData,
                {
                    withCredentials: true,
                }
            );

            setSuccess(
                response.data?.message ||
                "Resume uploaded successfully!"
            );

            setFile(null);

            // Optional: redirect after successful upload
            // router.push("/dashboard/resumes");

        } catch (err: any) {
            console.error("Resume upload error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to upload resume. Please try again."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className= "min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8" >
        <div className="mx-auto max-w-4xl" >

            {/* Back Button */ }
            < button
    onClick = {() => router.push("/dashboard")
}
className = "mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
    >
    <FiArrowLeft />
          Back to Dashboard
    </button>

{/* Header */ }
<div className="mb-8" >
    <h1 className="text-3xl font-bold tracking-tight text-slate-900" >
        Upload Your Resume
            </h1>

            < p className = "mt-2 text-slate-600" >
                Upload your resume and let our AI analyze your skills,
                    experience, ATS score, and career opportunities.
</p>
    </div>

{/* Main Card */ }
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" >

    {/* Upload Area */ }
    < div
onDragOver = { handleDragOver }
onDragLeave = { handleDragLeave }
onDrop = { handleDrop }
className = {`relative rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${dragActive
        ? "border-blue-500 bg-blue-50"
        : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
    }`}
          >
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100" >
        <FiUploadCloud className="text-3xl text-blue-600" />
            </div>

            < h2 className = "mt-5 text-xl font-semibold text-slate-900" >
                Drag & drop your resume here
                    </h2>

                    < p className = "mt-2 text-sm text-slate-500" >
                        or choose a file from your computer
                            </p>

                            < label className = "mt-6 inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700" >
                                <FiUploadCloud className="mr-2" />
                                    Choose Resume
                                        < input
type = "file"
accept = ".pdf,.docx"
onChange = { handleFileChange }
className = "hidden"
    />
    </label>

    < p className = "mt-4 text-xs text-slate-400" >
        Supported formats: PDF, DOCX • Maximum size: 5MB
            </p>
            </div>

{/* Selected File */ }
{
    file && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4" >
            <div className="flex items-center justify-between gap-4" >

                <div className="flex min-w-0 items-center gap-3" >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100" >
                        <FiFileText className="text-xl text-red-600" />
                            </div>

                            < div className = "min-w-0" >
                                <p className="truncate font-medium text-slate-900" >
                                    { file.name }
                                    </p>

                                    < p className = "text-sm text-slate-500" >
                                        {(file.size / 1024 / 1024).toFixed(2)
} MB
    </p>
    </div>
    </div>

    < button
onClick = { removeFile }
disabled = { uploading }
className = "rounded-lg p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed"
aria-label="Remove resume"
    >
    <FiX />
    </button>
    </div>
    </div>
          )}

{/* Success Message */ }
{
    success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700" >
            <FiCheckCircle className="mt-0.5 shrink-0" />

                <div>
                <p className="font-medium" >
                    Upload successful
                        </p>

                        < p className = "mt-1 text-sm" >
                            { success }
                            </p>
                            </div>
                            </div>
          )
}

{/* Error Message */ }
{
    error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700" >
            <FiAlertCircle className="mt-0.5 shrink-0" />

                <div>
                <p className="font-medium" >
                    Upload failed
                        </p>

                        < p className = "mt-1 text-sm" >
                            { error }
                            </p>
                            </div>
                            </div>
          )
}

{/* Upload Button */ }
<div className="mt-8 flex justify-end" >
    <button
              onClick={ uploadResume }
disabled = {!file || uploading}
className = "flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
    >
{
    uploading?(
                <>
    <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        Uploading...
</>
              ) : (
    <>
    <FiUploadCloud className= "mr-2" />
    Upload Resume
        </>
              )}
</button>
    </div>
    </div>

{/* AI Features */ }
<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" >

    <FeatureCard
            title="AI Resume Analysis"
description = "Analyze your resume content, skills and experience."
    />

    <FeatureCard
            title="ATS Score"
description = "Evaluate how well your resume performs against ATS systems."
    />

    <FeatureCard
            title="Job Matching"
description = "Find jobs that match your skills and experience."
    />

    </div>
    </div>
    </main>
  );
}

function FeatureCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className= "rounded-xl border border-slate-200 bg-white p-5 shadow-sm" >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100" >
            <FiCheckCircle className="text-blue-600" />
                </div>

                < h3 className = "font-semibold text-slate-900" >
                    { title }
                    </h3>

                    < p className = "mt-1 text-sm leading-6 text-slate-500" >
                        { description }
                        </p>
                        </div>
  );
}