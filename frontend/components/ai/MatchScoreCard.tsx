interface MatchScoreCardProps {
    score: number;
}

export default function MatchScoreCard({
    score,
}: MatchScoreCardProps) {
    let color = "text-red-500";

    if (score >= 80) color = "text-green-500";
    else if (score >= 60) color = "text-yellow-500";

    return (
        <div className= "rounded-xl border p-8 text-center shadow" >

        <h2 className="text-lg font-semibold" >
            Job Match Score
                </h2>

                < p
    className = {`mt-6 text-6xl font-bold ${color}`
}
      >
    { score } %
    </p>

    </div>
  );
}