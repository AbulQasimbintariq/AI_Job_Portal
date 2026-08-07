"use client";

import { useState } from "react";
import {
    User,
    Lock,
    Bell,
    Moon,
    Save,
} from "lucide-react";

export default function SettingsPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        darkMode: false,
        notifications: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = () => {
        // TODO:
        // PUT /api/users/settings
        console.log(form);

        alert("Settings saved successfully.");
    };

    return (
        <div className= "space-y-8" >

        {/* Header */ }

        < div >
        <h1 className="text-3xl font-bold text-slate-800" >
            Settings
            </h1>

            < p className = "mt-2 text-slate-500" >
                Manage your account preferences and application settings.
        </p>
                    </div>

    {/* Profile */ }

    <div className="rounded-2xl bg-white p-6 shadow" >

        <div className="mb-6 flex items-center gap-2" >
            <User className="text-blue-600" />
                <h2 className="text-xl font-semibold" >
                    Profile Information
                        </h2>
                        </div>

                        < div className = "grid gap-5 md:grid-cols-2" >

                            <div>
                            <label className="mb-2 block text-sm font-medium" >
                                Full Name
                                    </label>

                                    < input
    type = "text"
    name = "name"
    value = { form.name }
    onChange = { handleChange }
    className = "w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />
        </div>

        < div >
        <label className="mb-2 block text-sm font-medium" >
            Email
            </label>

            < input
    type = "email"
    name = "email"
    value = { form.email }
    onChange = { handleChange }
    className = "w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
        />
        </div>

        </div>

        </div>

    {/* Preferences */ }

    <div className="rounded-2xl bg-white p-6 shadow" >

        <div className="mb-6 flex items-center gap-2" >
            <Bell className="text-blue-600" />
                <h2 className="text-xl font-semibold" >
                    Preferences
                    </h2>
                    </div>

                    < div className = "space-y-5" >

                        <label className="flex items-center justify-between" >

                            <div className="flex items-center gap-3" >
                                <Bell />
                                < span > Email Notifications </span>
                                    </div>

                                    < input
    type = "checkbox"
    name = "notifications"
    checked = { form.notifications }
    onChange = { handleChange }
        />

        </label>

        < label className = "flex items-center justify-between" >

            <div className="flex items-center gap-3" >
                <Moon />
                < span > Dark Mode </span>
                    </div>

                    < input
    type = "checkbox"
    name = "darkMode"
    checked = { form.darkMode }
    onChange = { handleChange }
        />

        </label>

        </div>

        </div>

    {/* Security */ }

    <div className="rounded-2xl bg-white p-6 shadow" >

        <div className="mb-6 flex items-center gap-2" >
            <Lock className="text-blue-600" />
                <h2 className="text-xl font-semibold" >
                    Security
                    </h2>
                    </div>

                    < button className = "rounded-xl border border-slate-300 px-5 py-3 transition hover:bg-slate-100" >
                        Change Password
                            </button>

                            </div>

    {/* Save */ }

    <div className="flex justify-end" >

        <button
          onClick={ handleSave }
    className = "flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
        <Save size={ 18 } />
          Save Changes
        </button>

        </div>

        </div>
  );
}