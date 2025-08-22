"use client";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface RecipeCardProps {
    recipe: {
        id: number;
        title: string;
        description: string;
        rating: number;
    };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { token } = useAuth();

    const handleRate = async (value: number) => {
        if (!token) return alert("Login to rate recipes");

        try {
            await api.post(
                `/recipes/${recipe.id}/rate`,
                { rating: value },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`You rated ${recipe.title} with ${value}⭐`);
        } catch (err) {
            console.error(err);
            alert("Failed to rate recipe");
        }
    };

    return (
        <div className="border p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button
                        key={n}
                        onClick={() => handleRate(n)}
                        className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                    >
                        {n}⭐
                    </button>
                ))}
            </div>
        </div>
    );
}
