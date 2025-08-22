"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import {useRecipes} from "@/context/RecipeContext";
import {Recipe} from "@/types";

export default function AddRecipe() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const { addRecipe } = useRecipes();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please fill in all fields");
            return;


        }

        try {
            setLoading(true);
            const res = await axios.post<Recipe>(
                "http://localhost:3000/recipes",
                { title, description },


            );
            addRecipe(res.data); // 👉 додаємо в контекст
            router.push("/");
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to add recipe");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">🍲 Add New Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Recipe title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Recipe description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Recipe"}
                </button>
            </form>
        </div>
    );
}
