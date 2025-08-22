"use client";
import { useState } from "react";
import api from "../services/api";

export default function Rating({ recipeId, currentRating }: { recipeId: number; currentRating: number }) {
    const [rating, setRating] = useState(currentRating);

    const handleRate = async (value: number) => {
        setRating(value);
        try {
            await api.post(`/recipes/${recipeId}/rate`, { rating: value });
        } catch (err) {
            console.error("Failed to rate recipe", err);
        }
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleRate(star)}
                    className={`cursor-pointer text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}
