import Link from "next/link";
import {
    Upload,
    Brain,
    FilePenLine,
    FileText,
    MessageSquare,
} from "lucide-react";

const actions = [
    {
        title: "Upload Resume",
        href: "/dashboard/resume-upload",
        icon: Upload,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Analyze Resume",
        href: "/dashboard/resume-analyzer",
        icon: Brain,
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "Tailor Resume",
        href: "/dashboard/tailor-resume",
        icon: FilePenLine,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Cover Letter",
        href: "/dashboard/cover-letter",
        icon: FileText,
        color: "bg-orange-100 text-orange-600",
    },
    {
        title: "Mock Interview",
        href: "/dashboard/mock-interview",
        icon: MessageSquare,
        color: "bg-pink-100 text-pink-600",
    },
];

export default function QuickActions() {
    return (
        <div className= "rounded-2xl bg-white p-6 shadow-md" >
        <h2 className="mb-6 text-2xl font-bold" >
            Quick Actions
                </h2>

                < div className = "grid gap-4 md:grid-cols-2 xl:grid-cols-5" >
                {
                    actions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <Link
              key= { action.title }
                        href = { action.href }
                        className = "group rounded-xl border p-5 transition hover:border-blue-500 hover:shadow-lg"
                            >
                            <div
                className={ `mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${action.color}` }
              >
                            <Icon size={ 24 } />
                                </div>

                                < h3 className = "font-semibold transition group-hover:text-blue-600" >
                                    { action.title }
                                    </h3>
                                    </Link>
          );
                })
}
</div>
    </div>
  );
}