import CoverLetterGenerator from "@/components/ai/CoverLetterGenerator";

export default function CoverLetterPage() {
    return (
        <div className= "mx-auto max-w-6xl p-8" >
        <h1 className="mb-8 text-4xl font-bold" >
            AI Cover Letter Generator
                </h1>

                < CoverLetterGenerator />
                </div>
  );
}