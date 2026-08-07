    import { gemini } from "../config/gemini";

    export interface ResumeAnalysisResult {
        atsScore: number;
        strengths: string[];
        missingSkills: string[];
        suggestions: string[];
        summary: string;
    }

    export const analyzeResume = async (
        resume: string,
        jobDescription: string
    ): Promise<ResumeAnalysisResult> => {

        const prompt = `
    Analyze this resume against the job description.

    Return ONLY valid JSON.

    {
    "atsScore":0,
    "strengths":[],
    "missingSkills":[],
    "suggestions":[],
    "summary":""
    }

    Resume:
    ${resume}

    Job Description:
    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model:"gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    };

    export interface TailoredResumeResult {
        originalATS: number;
        improvedATS: number;
        tailoredResume: {
            summary: string;
            skills: string[];
            experience: string[];
            projects: string[];
        };
        improvements: string[];
    }

    export const tailorResume = async (
        resume: string,
        jobDescription: string
    ): Promise<TailoredResumeResult> => {

        const prompt = `
    You are an expert ATS Resume Writer and Senior Technical Recruiter.

    Your task is to rewrite the resume so it is highly optimized for the provided job description.

    Return ONLY valid JSON.

    JSON format:

    {
    "originalATS": 0,
    "improvedATS": 0,
    "tailoredResume": {
        "summary": "",
        "skills": [],
        "experience": [],
        "projects": []
    },
    "improvements": []
    }

    Rules:

    - originalATS between 0 and 100
    - improvedATS between 0 and 100
    - improvedATS must be greater than originalATS
    - Rewrite the professional summary.
    - Improve skills using relevant ATS keywords.
    - Rewrite experience bullet points professionally.
    - Rewrite project descriptions professionally.
    - Do NOT invent fake experience.
    - Do NOT add technologies that cannot reasonably be inferred from the user's resume.
    - Return ONLY JSON.
    - No markdown.
    - No explanations.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as TailoredResumeResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);

            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Cover Letter Generator
     * =====================================================
     */

    export interface CoverLetterResult {
        coverLetter: string;
    }

    export const generateCoverLetter = async (
        resume: string,
        jobDescription: string,
        companyName: string,
        position: string
    ): Promise<CoverLetterResult> => {

        const prompt = `
    You are an expert HR Recruiter and Professional Resume Writer.

    Generate a professional ATS-friendly cover letter.

    Return ONLY valid JSON.

    JSON Format:

    {
    "coverLetter": ""
    }

    Rules:

    - Address the company as "${companyName}".
    - Position is "${position}".
    - Use information only from the resume.
    - Highlight matching skills from the job description.
    - Do not invent fake experience.
    - Keep it between 250 and 400 words.
    - Make it professional and persuasive.
    - End with a polite closing.
    - Return ONLY JSON.
    - No markdown.
    - No explanation.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as CoverLetterResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);

            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Interview Question Generator
     * =====================================================
     */

    export interface InterviewQuestionResult {
        hrQuestions: string[];
        technicalQuestions: string[];
        behavioralQuestions: string[];
        codingQuestions: string[];
    }

    export const generateInterviewQuestions = async (
        resume: string,
        jobDescription: string
    ): Promise<InterviewQuestionResult> => {

        const prompt = `
    You are a Senior Technical Interviewer.

    Generate interview questions based ONLY on the candidate's resume and the job description.

    Return ONLY valid JSON.

    JSON Format:

    {
    "hrQuestions": [],
    "technicalQuestions": [],
    "behavioralQuestions": [],
    "codingQuestions": []
    }

    Rules:

    - Generate exactly 5 HR questions.
    - Generate exactly 5 Technical questions.
    - Generate exactly 5 Behavioral questions.
    - Generate exactly 5 Coding questions.
    - Questions should match the candidate's experience.
    - Questions should be relevant to the job description.
    - Do NOT include answers.
    - Return ONLY JSON.
    - No markdown.
    - No explanation.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as InterviewQuestionResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);

            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Job Match Score
     * =====================================================
     */

    export interface JobMatchResult {
        matchScore: number;
        matchedSkills: string[];
        missingSkills: string[];
        strengths: string[];
        weaknesses: string[];
        recommendation: string;
    }

    export const generateJobMatchScore = async (
        resume: string,
        jobDescription: string
    ): Promise<JobMatchResult> => {

        const prompt = `
    You are an expert ATS system and Senior Technical Recruiter.

    Compare the candidate's resume with the job description.

    Return ONLY valid JSON.

    JSON format:

    {
    "matchScore": 0,
    "matchedSkills": [],
    "missingSkills": [],
    "strengths": [],
    "weaknesses": [],
    "recommendation": ""
    }

    Rules:

    - matchScore must be between 0 and 100.
    - matchedSkills should contain technologies present in both resume and job description.
    - missingSkills should contain required technologies not found in the resume.
    - strengths should contain 3-5 strengths.
    - weaknesses should contain 3-5 weaknesses.
    - recommendation should be a short hiring recommendation.
    - Return ONLY JSON.
    - No markdown.
    - No explanation.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as JobMatchResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Skill Gap Analyzer
     * =====================================================
     */

    export interface LearningRoadmapItem {
        skill: string;
        priority: "High" | "Medium" | "Low";
        estimatedTime: string;
        resources: string[];
    }

    export interface SkillGapResult {
        missingSkills: string[];
        learningRoadmap: LearningRoadmapItem[];
        careerAdvice: string;
    }

    export const analyzeSkillGap = async (
        resume: string,
        jobDescription: string
    ): Promise<SkillGapResult> => {

        const prompt = `
    You are an expert Career Coach, ATS Specialist, and Senior Software Engineering Mentor.

    Analyze the candidate's resume against the job description.

    Return ONLY valid JSON.

    JSON format:

    {
    "missingSkills": [],
    "learningRoadmap": [
        {
        "skill": "",
        "priority": "High",
        "estimatedTime": "",
        "resources": []
        }
    ],
    "careerAdvice": ""
    }

    Rules:

    - missingSkills should list all important skills absent from the resume.
    - learningRoadmap should include one object for each missing skill.
    - priority must be one of:
    - High
    - Medium
    - Low
    - estimatedTime should be realistic (for example: "2 weeks", "1 month").
    - resources should include 2–3 high-quality learning resources or certifications.
    - careerAdvice should be 2–4 sentences.
    - Return ONLY JSON.
    - No markdown.
    - No explanations.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as SkillGapResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Resume Bullet Enhancer
     * =====================================================
     */

    export interface ResumeBulletEnhancerResult {
        originalBullets: string[];
        enhancedBullets: string[];
        atsKeywordsAdded: string[];
        improvementTips: string[];
    }

    export const enhanceResumeBullets = async (
        bullets: string[],
        jobDescription: string
    ): Promise<ResumeBulletEnhancerResult> => {

        const prompt = `
    You are a Senior Resume Writer and ATS Optimization Expert.

    Rewrite each resume bullet point to be:

    - ATS optimized
    - Professional
    - Achievement-oriented
    - Action-driven
    - Quantifiable whenever possible

    Return ONLY valid JSON.

    JSON format:

    {
    "originalBullets": [],
    "enhancedBullets": [],
    "atsKeywordsAdded": [],
    "improvementTips": []
    }

    Rules:

    - Rewrite every bullet.
    - Start with powerful action verbs.
    - Include ATS keywords from the job description.
    - Do not invent fake experience.
    - Keep each bullet under 35 words.
    - improvementTips should contain 4-6 resume improvement tips.
    - Return ONLY JSON.

    Resume Bullets:

    ${bullets.join("\n")}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as ResumeBulletEnhancerResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Mock Interview Evaluator
     * =====================================================
     */

    export interface MockInterviewResult {
        score: number;
        strengths: string[];
        weaknesses: string[];
        suggestions: string[];
        idealAnswer: string;
        overallFeedback: string;
    }

    export const evaluateInterviewAnswer = async (
        question: string,
        answer: string,
        jobDescription: string
    ): Promise<MockInterviewResult> => {

        const prompt = `
    You are a Senior Technical Interviewer.

    Evaluate the candidate's interview answer.

    Return ONLY valid JSON.

    JSON format:

    {
    "score": 0,
    "strengths": [],
    "weaknesses": [],
    "suggestions": [],
    "idealAnswer": "",
    "overallFeedback": ""
    }

    Rules:

    - score must be between 0 and 100.
    - strengths: 3-5 points.
    - weaknesses: 3-5 points.
    - suggestions: 3-5 actionable improvements.
    - idealAnswer: 150-250 words.
    - overallFeedback: 2-4 sentences.
    - Do NOT invent candidate experience.
    - Return ONLY JSON.
    - No markdown.
    - No explanations.

    Interview Question:

    ${question}

    Candidate Answer:

    ${answer}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as MockInterviewResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Career Advisor
     * =====================================================
     */

    export interface LearningStep {
        month: string;
        focus: string;
        goals: string[];
    }

    export interface CareerAdvisorResult {
        recommendedRoles: string[];
        salaryRange: string;
        certifications: string[];
        nextSkills: string[];
        learningRoadmap: LearningStep[];
        careerAdvice: string;
    }

    export const generateCareerAdvice = async (
        resume: string,
        careerGoal: string
    ): Promise<CareerAdvisorResult> => {

        const prompt = `
    You are a Senior Career Coach and Technical Mentor.

    Analyze the candidate's resume and career goal.

    Return ONLY valid JSON.

    JSON format:

    {
    "recommendedRoles": [],
    "salaryRange": "",
    "certifications": [],
    "nextSkills": [],
    "learningRoadmap": [
        {
        "month": "",
        "focus": "",
        "goals": []
        }
    ],
    "careerAdvice": ""
    }

    Rules:

    - Recommend 3-6 suitable job roles.
    - salaryRange should be a realistic annual salary range.
    - Recommend 3-6 certifications.
    - Recommend 5-10 next skills.
    - learningRoadmap should cover 6 months.
    - Each month should include a focus area and 2-4 learning goals.
    - careerAdvice should be 2-4 concise sentences.
    - Do NOT invent work experience.
    - Return ONLY JSON.
    - No markdown.
    - No explanations.

    Resume:

    ${resume}

    Career Goal:

    ${careerGoal}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as CareerAdvisorResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Job Recommendation Engine
     * =====================================================
     */

    export interface JobRecommendation {
        jobTitle: string;
        company: string;
        matchScore: number;
        matchedSkills: string[];
        missingSkills: string[];
        reasons: string[];
        priority: "High" | "Medium" | "Low";
    }

    export interface JobRecommendationResult {
        recommendations: JobRecommendation[];
        overallAdvice: string;
    }

    export const recommendJobs = async (
        resume: string,
        jobs: {
            title: string;
            company: string;
            description: string;
        }[]
    ): Promise<JobRecommendationResult> => {

        const prompt = `
    You are an AI Career Advisor.

    Compare the candidate's resume with the available jobs.

    Return ONLY valid JSON.

    JSON format:

    {
    "recommendations":[
        {
        "jobTitle":"",
        "company":"",
        "matchScore":0,
        "matchedSkills":[],
        "missingSkills":[],
        "reasons":[],
        "priority":"High"
        }
    ],
    "overallAdvice":""
    }

    Rules:

    - Recommend the top 5 jobs only.
    - Match score must be between 0 and 100.
    - Priority must be High, Medium or Low.
    - reasons should contain 2-4 items.
    - Do NOT invent skills not present in the resume or job descriptions.
    - Sort recommendations by matchScore (highest first).
    - Return ONLY JSON.

    Resume:

    ${resume}

    Jobs:

    ${JSON.stringify(jobs, null, 2)}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as JobRecommendationResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Recruiter Assistant
     * =====================================================
     */

    export interface RecruiterEvaluationResult {
        resumeSummary: string;
        overallScore: number;
        technicalSkills: string[];
        strengths: string[];
        concerns: string[];
        interviewFocus: string[];
        recommendation: "Strong Hire" | "Hire" | "Consider" | "Reject";
    }

    export const evaluateCandidate = async (
        resume: string,
        jobDescription: string
    ): Promise<RecruiterEvaluationResult> => {

        const prompt = `
    You are a Senior Technical Recruiter.

    Evaluate this candidate for the job.

    Return ONLY valid JSON.

    JSON format:

    {
    "resumeSummary":"",
    "overallScore":0,
    "technicalSkills":[],
    "strengths":[],
    "concerns":[],
    "interviewFocus":[],
    "recommendation":"Hire"
    }

    Rules:

    - overallScore must be between 0 and 100.
    - resumeSummary should be 3-5 sentences.
    - technicalSkills should contain 5-10 skills.
    - strengths should contain 3-6 items.
    - concerns should contain 2-5 items.
    - interviewFocus should contain 3-5 interview topics.
    - recommendation must be one of:
    Strong Hire
    Hire
    Consider
    Reject
    - Do NOT invent experience or achievements.
    - Evaluate only the provided resume and job description.
    - Return ONLY JSON.
    - No markdown.
    - No explanations.

    Resume:

    ${resume}

    Job Description:

    ${jobDescription}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as RecruiterEvaluationResult;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };

    /**
     * =====================================================
     * AI Resume Parser
     * =====================================================
     */

    export interface ParsedResume {

        personalInfo: {
            fullName: string;
            email: string;
            phone: string;
            location: string;
            linkedin: string;
            github: string;
            portfolio: string;
        };

        summary: string;

        skills: string[];

        education: {
            degree: string;
            institution: string;
            startYear: string;
            endYear: string;
        }[];

        experience: {
            company: string;
            position: string;
            duration: string;
            responsibilities: string[];
        }[];

        projects: {
            title: string;
            description: string;
            technologies: string[];
        }[];

        certifications: string[];

        languages: string[];
    }

    export const parseResume = async (
        resumeText: string
    ): Promise<ParsedResume> => {

        const prompt = `
    You are an ATS Resume Parser.

    Extract structured information from this resume.

    Return ONLY valid JSON.

    JSON format:

    {
    "personalInfo":{
        "fullName":"",
        "email":"",
        "phone":"",
        "location":"",
        "linkedin":"",
        "github":"",
        "portfolio":""
    },

    "summary":"",

    "skills":[],

    "education":[
        {
            "degree":"",
            "institution":"",
            "startYear":"",
            "endYear":""
        }
    ],

    "experience":[
        {
            "company":"",
            "position":"",
            "duration":"",
            "responsibilities":[]
        }
    ],

    "projects":[
        {
            "title":"",
            "description":"",
            "technologies":[]
        }
    ],

    "certifications":[],

    "languages":[]
    }

    Rules:

    - Do not invent information.
    - If missing, return empty string or empty array.
    - Return ONLY JSON.
    - No markdown.
    - No explanation.

    Resume:

    ${resumeText}
    `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            throw new Error("No response received from Gemini.");
        }

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(cleaned) as ParsedResume;
        } catch (error) {
            console.error("Gemini Response:", cleaned);
            throw new Error("Gemini returned invalid JSON.");
        }
    };