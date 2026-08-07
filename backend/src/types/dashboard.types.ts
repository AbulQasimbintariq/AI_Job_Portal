export interface DashboardStats {
    resumes: number;
    analyses: number;
    coverLetters: number;
    jobMatches: number;
}

export interface DashboardActivity {
    id: string;
    type: string;
    title: string;
    createdAt: Date;
}

export interface DashboardOverview {
    stats: DashboardStats;
    activities: DashboardActivity[];
    profile: {
        name: string;
        email: string;
        role: string;
        createdAt: Date;
    };
}