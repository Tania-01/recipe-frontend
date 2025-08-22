"use client";

import Navbar from "@/components/Navbar";
import RecipeForm from "@/components/RecipeForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddRecipePage() {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        if (typeof window !== "undefined") router.push("/login");
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
                <RecipeForm onCreated={() => router.push("/")} />
            </div>
        </>
    );
}
