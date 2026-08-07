"use client";

import Link from "next/link";
import {
    Bell,
    FileText,
    BriefcaseBusiness,
    Brain,
    MessageSquare,
} from "lucide-react";

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    icon: React.ReactNode;
    href?: string;
    unread: boolean;
}

const notifications: Notification[] = [
    {
        id: 1,
        title: "Resume Analysis Complete",
        message: "Your latest resume has been analyzed successfully.",
        time: "2 min ago",
        icon: <Brain size={ 18} className = "text-blue-600" />,
    href: "/dashboard/resume-analyzer",
    unread: true,
  },
{
    id: 2,
        title: "New Job Match",
            message: "5 new jobs match your profile.",
                time: "15 min ago",
                    icon: (
                        <BriefcaseBusiness
        size= { 18}
    className = "text-green-600"
        />
    ),
    href: "/dashboard/job-match",
        unread: true,
  },
{
    id: 3,
        title: "Cover Letter Ready",
            message: "Your AI-generated cover letter is ready.",
                time: "1 hour ago",
                    icon: (
                        <FileText
        size= { 18}
    className = "text-orange-600"
        />
    ),
    href: "/dashboard/cover-letter",
        unread: false,
  },
{
    id: 4,
        title: "Interview Reminder",
            message: "Continue your mock interview practice.",
                time: "Yesterday",
                    icon: (
                        <MessageSquare
        size= { 18}
    className = "text-purple-600"
        />
    ),
    href: "/dashboard/mock-interview",
        unread: false,
  },
];

export default function NotificationDropdown() {
    return (
        <div className= "absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" >
        {/* Header */ }

        < div className = "flex items-center justify-between border-b border-slate-200 px-5 py-4" >
            <div className="flex items-center gap-2" >
                <Bell size={ 18 } />

                    < h3 className = "font-semibold" >
                        Notifications
                        </h3>
                        </div>

                        < button className = "text-sm font-medium text-blue-600 hover:text-blue-700" >
                            Mark all as read
                                </button>
                                </div>

    {/* Notifications */ }

    <div className="max-h-96 overflow-y-auto" >
    {
        notifications.length > 0 ? (
            notifications.map((notification) => (
                <Link
              key= { notification.id }
              href = { notification.href ?? "#" }
              className = "flex gap-4 border-b border-slate-100 p-4 transition hover:bg-slate-50"
                >
                <div className="mt-1" >
                { notification.icon }
                </div>

            < div className = "flex-1" >
            <div className="flex items-center justify-between" >

            <h4 className="font-medium text-slate-800" >
            { notification.title }
            </h4>

                  {
                    notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}

        </div>

        < p className = "mt-1 text-sm text-slate-500" >
            { notification.message }
            </p>

            < p className = "mt-2 text-xs text-slate-400" >
                { notification.time }
                </p>
                </div>
                </Link>
          ))
        ) : (
        <div className= "py-12 text-center" >
        <Bell
              size={ 40 }
    className = "mx-auto mb-3 text-slate-300"
        />

        <p className="font-medium text-slate-500" >
            No notifications
                </p>
                </div>
        )
}
</div>

{/* Footer */ }

<div className="border-t border-slate-200 p-4 text-center" >
    <Link
          href="/dashboard/notifications"
className = "text-sm font-semibold text-blue-600 hover:text-blue-700"
    >
    View All Notifications
        </Link>
        </div>
        </div>
  );
}