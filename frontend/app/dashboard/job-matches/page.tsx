import JobMatch from "@/components/ai/JobMatch";

export default function JobMatchPage() {
    return (
        <div className= "mx-auto max-w-6xl p-8" >

        <h1 className="mb-8 text-4xl font-bold" >
            AI Job Match Score
                </h1>

                < JobMatch />

                </div>
  );
}