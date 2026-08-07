"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import {
    loginSchema,
    LoginInput,
} from "@/lib/validations/auth";

import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
    const { login, loading } = useAuth();

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginInput) {
        try {
            await login(
                data.email,
                data.password
            );

            toast.success("Login successful");
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ??
                "Login failed"
            );
        }
    }

    return (
        <form
            onSubmit= { handleSubmit(onSubmit) }
    className = "space-y-5"
        >
        <div>
        <input
                    { ...register("email") }
    placeholder = "Email"
    className = "w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm" >
            { errors.email?.message }
            </p>
            </div>

            < div className = "relative" >
                <input
                    type={
        showPassword
            ? "text"
            : "password"
    }
    {...register("password") }
    placeholder = "Password"
    className = "w-full border rounded-lg p-3"
        />

        <button
                    type="button"
    onClick = {() =>
    setShowPassword(
        !showPassword
    )
}
className = "absolute right-4 top-3"
    >
    {
        showPassword?(
                        <EyeOff size = { 18} />
                    ): (
                <Eye size = { 18 } />
                    )}
</button>

    < p className = "text-red-500 text-sm" >
        { errors.password?.message }
        </p>
        </div>

        < button
disabled = { loading }
className = "w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition"
    >
{
    loading
    ? "Signing in..."
        : "Login"
}
    </button>
    </form>
    );
}