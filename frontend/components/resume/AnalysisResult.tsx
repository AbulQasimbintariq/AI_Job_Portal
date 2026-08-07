"use client";

interface Props {
    data: any;
}

export default function AnalysisResult({
    data,
}: Props) {
    return (
        <div className= "space-y-6" >

        <div className="border rounded-lg p-6" >

            <h2 className="text-2xl font-bold mb-4" >
                AI Analysis
                    </h2>

                    < pre className = "whitespace-pre-wrap" >
                    {
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                    }
                        </pre>

                        </div>

                        </div>
  );
}