import JobRecommendationEngine from "@/components/ai/JobRecommendationEngine";

export default function JobRecommendationPage() {
    return (
        <div className= "mx-auto max-w-7xl p-8" >

        <h1 className="mb-8 text-4xl font-bold" >
            AI Job Recommendation Engine
                </h1>

                < JobRecommendationEngine />

                </div>
  );
}