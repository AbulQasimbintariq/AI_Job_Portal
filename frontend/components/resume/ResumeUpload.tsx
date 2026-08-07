"use client";

import { useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

import aiService from "@/services/ai.service";

export default function ResumeUpload() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const [result, setResult] = useState<any>(null);

    const handleSelect = () => {
        inputRef.current?.click();
    };

    const uploadFile = async (file: File) => {
        if (!file) return;

        const allowed = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowed.includes(file.type)) {
            toast.error("Only PDF or DOCX files are allowed.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setLoading(true);
            setFileName(file.name);

            const response = await aiService.uploadResume(formData);

            setResult(response.data.data);

            toast.success("Resume uploaded successfully!");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Upload failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (file) uploadFile(file);
    };

    return (
        <div className= "space-y-6" >

        <div
        onClick={ handleSelect }
    className = "border-2 border-dashed rounded-xl p-12 cursor-pointer hover:bg-muted transition"
        >
        <div className="flex flex-col items-center gap-4" >

            {
                loading?(
            <Loader2 className = "w-12 h-12 animate-spin" />
          ): (
                        <Upload className = "w-12 h-12" />
          )
}

<div className="text-center" >

    <h2 className="text-xl font-bold" >
        Upload Resume
            </h2>

            < p className = "text-muted-foreground" >
                PDF or DOCX
                    </p>

                    </div>

                    < input
ref = { inputRef }
type = "file"
hidden
accept = ".pdf,.docx"
onChange = { handleChange }
    />

    </div>
    </div>

{
    fileName && (
        <div className="flex items-center gap-3 rounded-lg border p-4" >

            <FileText />

            < span > { fileName } </span>

            </div>
      )
}

{
    result && (

        <div className="rounded-xl border p-6 space-y-6" >

            <h2 className="text-2xl font-bold" >
                Parsed Resume
                    </h2>

                    < div >

                    <h3 className="font-semibold" >
                        Extracted Text
                            </h3>

                            < p className = "whitespace-pre-wrap text-sm mt-2" >
                                { result.extractedText }
                                </p>

                                </div>

                                < div >

                                <h3 className="font-semibold" >
                                    AI Parsed Resume
                                        </h3>

                                        < pre className = "overflow-auto rounded-lg bg-muted p-4 text-sm" >
                                        {
                                            JSON.stringify(
                                                result.parsedResume,
                                                null,
                                                2
                                            )
                                        }
                                            </pre>

                                            </div>

                                            </div>

      )
}

</div>
  );
}