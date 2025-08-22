"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api, { setAuthToken } from "@/services/api";

export default function RecipeForm({ onCreated }: { onCreated?: () => void }) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cuisine, setCuisine] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return alert("You must be logged in!");

        setAuthToken(token);

        try {
            await api.post("/recipes", {
                title,
                description,
                ingredients,
                instructions,
                cuisine,
            });
            setTitle("");
            setDescription("");
            setIngredients("");
            setInstructions("");
            setCuisine("");
            onCreated?.();
        } catch (err) {
            console.error("Failed to create recipe:", err);
            alert("Failed to create recipe");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
            <h2 className="text-xl font-bold">Add Recipe</h2>
            <input
                type="text"
                placeholder="Title"
                className="w-full border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Ingredients (comma separated)"
                className="w-full border p-2 rounded"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
            />
            <textarea
                placeholder="Instructions"
                className="w-full border p-2 rounded"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Cuisine (optional)"
                className="w-full border p-2 rounded"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Add Recipe
            </button>
        </form>
    );
}
