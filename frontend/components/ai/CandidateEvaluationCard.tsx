interface CandidateEvaluationCardProps {
    result: any;
}

export default function CandidateEvaluationCard({
    result,
}: CandidateEvaluationCardProps) {
    return (
        <div className= "space-y-6" >

        <div className="rounded-xl border bg-white p-6 shadow" >

            <h2 className="text-2xl font-bold mb-6" >
                Candidate Evaluation
                    </h2>

                    < div className = "grid gap-4" >

                        <div>
                        <h3 className="font-semibold" >
                            Overall Score
                                </h3>

                                < p className = "text-3xl text-green-600" >
                                    { result.score ?? "-" } %
                                    </p>
                                    </div>

                                    < div >
                                    <h3 className="font-semibold" >
                                        Recommendation
                                        </h3>

                                        <p>
    { result.recommendation }
    </p>
        </div>

        < div >
        <h3 className="font-semibold" >
            Summary
            </h3>

            <p>
    { result.summary }
    </p>
        </div>

        </div>

        </div>

        < div className = "grid md:grid-cols-2 gap-6" >

            <div className="rounded-xl border p-6" >

                <h3 className="font-bold mb-4" >
                    Strengths
                    </h3>

                    < ul className = "space-y-2" >

                    {
                        result.strengths?.map(
                            (item: string, index: number) => (
                                <li key= { index } >
                                    ✅ { item }
                            </li>
                        )
                        )
                    }

                        </ul>

                        </div>

                        < div className = "rounded-xl border p-6" >

                            <h3 className="font-bold mb-4" >
                                Weaknesses
                                </h3>

                                < ul className = "space-y-2" >

                                {
                                    result.weaknesses?.map(
                                        (item: string, index: number) => (
                                            <li key= { index } >
                                    ⚠️ { item }
                                        </li>
                                    )
                        )
                                }

                                    </ul>

                                    </div>

                                    </div>

                                    </div>
    );
}