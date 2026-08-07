interface InterviewFeedbackProps {
    result: any;
}

export default function InterviewFeedback({
    result,
}: InterviewFeedbackProps) {
    return (
        <div className= "space-y-6" >

        <div className="rounded-xl border p-6" >

            <h2 className="text-2xl font-bold mb-4" >
                AI Interview Feedback
                    </h2>

                    < pre className = "whitespace-pre-wrap overflow-auto" >
                        { JSON.stringify(result, null, 2) }
                        </pre>

                        </div>

                        </div>
  );
}