// "use client";

// import Link from "next/link";
// import { User, Mail, Shield, Calendar } from "lucide-react";

// interface UserProfileCardProps {
//     name: string;
//     email: string;
//     role: string;
//     joinedAt: string;
// }

// export default function UserProfileCard({
//     name,
//     email,
//     role,
//     joinedAt,
// }: UserProfileCardProps) {
//     return (
//         <div className= "rounded-2xl bg-white p-6 shadow-md" >
//         <div className="flex flex-col items-center" >

//             <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white" >
//                 <User size={ 40 } />
//                     </div>

//                     < h2 className = "mt-4 text-2xl font-bold" >
//                         { name }
//                         </h2>

//                         < p className = "text-gray-500" >
//                             { email }
//                             </p>

//                             </div>

//                             < div className = "mt-8 space-y-4" >

//                                 <div className="flex items-center gap-3" >
//                                     <Shield size={ 18 } className = "text-blue-600" />
//                                         <span>{ role } </span>
//                                         </div>

//                                         < div className = "flex items-center gap-3" >
//                                             <Mail size={ 18 } className = "text-green-600" />
//                                                 <span>{ email } </span>
//                                                 </div>

//                                                 < div className = "flex items-center gap-3" >
//                                                     <Calendar size={ 18 } className = "text-orange-600" />
//                                                         <span>Joined { joinedAt } </span>
//                                                             </div>

//                                                             </div>

//                                                             < Link
//     href = "/dashboard/profile"
//     className = "mt-8 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
//         >
//         Edit Profile
//             </Link>
//             </div>
//   );
// }


"use client";

import Link from "next/link";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Pencil,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { useAuth } from "@/hooks/useAuth";

export default function UserProfileCard() {
    const { user, loading } = useCurrentUser();
    // const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className= "rounded-2xl bg-white p-6 shadow-md" >
            <div className="animate-pulse space-y-4" >
                <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />

                    <div className="mx-auto h-6 w-40 rounded bg-slate-200" />

                        <div className="mx-auto h-4 w-56 rounded bg-slate-200" />

                            <div className="space-y-3 pt-6" >
                                <div className="h-4 rounded bg-slate-200" />
                                    <div className="h-4 rounded bg-slate-200" />
                                        <div className="h-4 rounded bg-slate-200" />
                                            </div>

                                            < div className = "h-10 rounded-xl bg-slate-200" />
                                                </div>
                                                </div>
    );
    }

    return (
        <div className= "rounded-2xl bg-white p-6 shadow-md" >

        {/* Avatar */ }

        < div className = "flex flex-col items-center" >

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" >

                <User size={ 40 } />

                    </div>

                    < h2 className = "mt-5 text-2xl font-bold text-slate-800" >
                        { user?.name ?? "User"
}
</h2>

    < p className = "mt-1 text-center text-sm text-slate-500" >
        { user?.email ?? "-"}
</p>

    </div>

{/* Divider */ }

<div className="my-6 border-t" />

    {/* User Information */ }

    < div className = "space-y-5" >

        <div className="flex items-center gap-3" >

            <Shield
            size={ 18 }
className = "text-blue-600"
    />

    <div>

    <p className="text-xs text-slate-500" >
        Role
        </p>

        < p className = "font-medium capitalize" >
            { user?.role ?? "-"}
</p>

    </div>

    </div>

    < div className = "flex items-center gap-3" >

        <Mail
            size={ 18 }
className = "text-green-600"
    />

    <div>

    <p className="text-xs text-slate-500" >
        Email
        </p>

        < p className = "font-medium break-all" >
            { user?.email ?? "-"}
</p>

    </div>

    </div>

    < div className = "flex items-center gap-3" >

        <Calendar
            size={ 18 }
className = "text-orange-600"
    />

    <div>

    <p className="text-xs text-slate-500" >
        Member Since
            </p>

            < p className = "font-medium" >
            {
                user?.createdAt
                    ? new Date(
                        user.createdAt
                    ).toLocaleDateString()
                : "-"}
                </p>

                </div>

                </div>

                </div>

{/* Divider */ }

<div className="my-6 border-t" />

    {/* Action Button */ }

    < Link
href = "/dashboard/profile"
className = "flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
    <Pencil size={ 18 } />

        Edit Profile

    </Link>

    </div>
  );
}