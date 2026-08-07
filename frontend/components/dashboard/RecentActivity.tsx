import {
    Brain,
    FileText,
    Upload,
    MessageSquare,
} from "lucide-react";

const activities = [
    {
        title: "Resume Uploaded",
        time: "2 minutes ago",
        icon: Upload,
        color: "text-blue-600",
    },
    {
        title: "Resume Analyzed",
        time: "15 minutes ago",
        icon: Brain,
        color: "text-purple-600",
    },
    {
        title: "Cover Letter Generated",
        time: "1 hour ago",
        icon: FileText,
        color: "text-green-600",
    },
    {
        title: "Mock Interview Completed",
        time: "Yesterday",
        icon: MessageSquare,
        color: "text-orange-600",
    },
];

export default function RecentActivity() {
    return (
        <div className= "rounded-2xl bg-white p-6 shadow-md" >
        <h2 className="mb-6 text-2xl font-bold" >
            Recent Activity
                </h2>

                < div className = "space-y-5" >
                {
                    activities.map((activity) => {
                        const Icon = activity.icon;

                        return (
                            <div
              key= {`${activity.title}-${activity.time}`
                    }
              className = "flex items-center gap-4 rounded-xl border p-4 transition hover:bg-slate-50"
                        >
                        <div
                className={`rounded-lg bg-slate-100 p-3 ${activity.color}`}
                    >
                    <Icon size={ 22 } />
                        </div>

                        < div className = "flex-1" >
                            <h3 className="font-semibold" >
                                { activity.title }
                                </h3>

                                < p className = "text-sm text-gray-500" >
                                    { activity.time }
                                    </p>
                                    </div>
                                    </div>
          );
})}
</div>
    </div>
  );
}