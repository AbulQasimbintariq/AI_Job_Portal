import api from "@/lib/axios";

export interface AnalyzeResumePayload {
  resume: string;
  jobDescription: string;
}

export interface TailorResumePayload {
  resume: string;
  jobDescription: string;
}

export interface CoverLetterPayload {
  resume: string;
  jobDescription: string;
  companyName: string;
  position: string;
}

export interface InterviewQuestionPayload {
  resume: string;
  jobDescription: string;
}

export interface JobMatchPayload {
  resume: string;
  jobDescription: string;
}

export interface SkillGapPayload {
  resume: string;
  jobDescription: string;
}

export interface ResumeBulletPayload {
  bullets: string[];
  jobDescription: string;
}

export interface MockInterviewPayload {
  question: string;
  answer: string;
  jobDescription: string;
}

export interface CareerAdvicePayload {
  resume: string;
  careerGoal: string;
}

export interface JobRecommendationPayload {
  resume: string;
  jobs: unknown[];
}

export interface RecruiterEvaluationPayload {
  resume: string;
  jobDescription: string;
}

export interface ParseResumePayload {
  resumeText: string;
}

const aiService = {
  analyzeResume: (data: AnalyzeResumePayload) =>
    api.post("/ai/analyze-resume", data),

  tailorResume: (data: TailorResumePayload) =>
    api.post("/ai/tailor-resume", data),

  generateCoverLetter: (data: CoverLetterPayload) =>
    api.post("/ai/generate-cover-letter", data),

  generateInterviewQuestions: (
    data: InterviewQuestionPayload
  ) => api.post("/ai/interview-questions", data),

  generateJobMatchScore: (
    data: JobMatchPayload
  ) => api.post("/ai/job-match-score", data),

  analyzeSkillGap: (data: SkillGapPayload) =>
    api.post("/ai/skill-gap", data),

  enhanceResumeBullets: (
    data: ResumeBulletPayload
  ) => api.post("/ai/enhance-bullets", data),

  evaluateInterviewAnswer: (
    data: MockInterviewPayload
  ) => api.post("/ai/mock-interview", data),

  generateCareerAdvice: (
    data: CareerAdvicePayload
  ) => api.post("/ai/career-advice", data),

  recommendJobs: (
    data: JobRecommendationPayload
  ) => api.post("/ai/job-recommendations", data),

  evaluateCandidate: (
    data: RecruiterEvaluationPayload
  ) => api.post("/ai/recruiter-evaluate", data),

  parseResume: (
    data: ParseResumePayload
  ) => api.post("/ai/parse-resume", data),

  uploadResume: (formData: FormData) =>
    api.post("/ai/upload-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  health: () => api.get("/ai/health"),
};

export default aiService;