import api from "@/lib/axios";

export const dashboardService = {
    async getStats() {
        const { data } = await api.get("/dashboard/stats");
        return data;
    },
};