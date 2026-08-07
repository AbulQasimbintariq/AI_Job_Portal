interface JobRecommendationCardProps {
  job: {
    title?: string;
    company?: string;
    location?: string;
    match?: number | string;
    salary?: string;
    description?: string;
    applyUrl?: string;
  };
}

export default function JobRecommendationCard({
  job,
}: JobRecommendationCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

      <h2 className="text-xl font-bold">
        {job.title ?? "Job Title"}
      </h2>

      <p className="mt-2 text-gray-600">
        {job.company ?? "Company"}
      </p>

      <div className="mt-4 space-y-2 text-sm">

        <p>
          📍 <strong>Location:</strong>{" "}
          {job.location ?? "N/A"}
        </p>

        <p>
          ⭐ <strong>Match:</strong>{" "}
          {job.match ?? "-"}%
        </p>

        <p>
          💰 <strong>Salary:</strong>{" "}
          {job.salary ?? "Not specified"}
        </p>

      </div>

      <p className="mt-5 text-gray-700">
        {job.description}
      </p>

      {job.applyUrl && (
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Apply Now
        </a>
      )}
    </div>
  );
}