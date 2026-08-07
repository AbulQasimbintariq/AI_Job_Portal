"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import {
    registerSchema,
    RegisterInput,
} from "@/lib/validations/auth";

import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
    const { register: registerUser, loading } = useAuth();

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterInput) {
        try {
            await registerUser(
                data.name,
                data.email,
                data.password
            );

            toast.success("Account created successfully!");

            reset();
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ??
                "Registration failed"
            );
        }
    }

    return (
        <form
            onSubmit= { handleSubmit(onSubmit) }
    className = "space-y-5"
        >
        {/* Name */ }
        < div >
        <input
                    type="text"
    placeholder = "Full Name"
    {...register("name") }
    className = "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

    {
        errors.name && (
            <p className="mt-1 text-sm text-red-500">
                { errors.name.message }
                </p>
                )
    }
        </div>

    {/* Email */ }
    <div>
        <input
                    type="email"
    placeholder = "Email Address"
    {...register("email") }
    className = "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

    {
        errors.email && (
            <p className="mt-1 text-sm text-red-500">
                { errors.email.message }
                </p>
                )
    }
        </div>

    {/* Password */ }
    <div className="relative" >
        <input
                    type={
        showPassword
            ? "text"
            : "password"
    }
    placeholder = "Password"
    {...register("password") }
    className = "w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
                    type="button"
    onClick = {() =>
    setShowPassword(!showPassword)
}
className = "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
    {
        showPassword?(
                        <EyeOff size = { 20} />
                    ): (
                <Eye size = { 20 } />
                    )}
</button>

{
    errors.password && (
        <p className="mt-1 text-sm text-red-500" >
            { errors.password.message }
            </p>
                )
}
</div>

{/* Confirm Password */ }
<div className="relative" >
    <input
                    type={
    showConfirmPassword
        ? "text"
        : "password"
}
placeholder = "Confirm Password"
{...register("confirmPassword") }
className = "w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

    <button
                    type="button"
onClick = {() =>
setShowConfirmPassword(
    !showConfirmPassword
)
                    }
className = "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
    {
        showConfirmPassword?(
                        <EyeOff size = { 20} />
                    ): (
                <Eye size = { 20 } />
                    )}
</button>

{
    errors.confirmPassword && (
        <p className="mt-1 text-sm text-red-500" >
            { errors.confirmPassword.message }
            </p>
                )
}
</div>

{/* Submit */ }
<button
                type="submit"
disabled = { loading }
className = "w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
{
    loading
    ? "Creating Account..."
        : "Create Account"
}
    </button>

{/* Login Link */ }
<p className="text-center text-sm text-gray-600" >
    Already have an account ? { " "}
        < Link
                    href = "/login"
className = "font-medium text-blue-600 hover:underline"
    >
    Login
    </Link>
    </p>
    </form>
    );
}