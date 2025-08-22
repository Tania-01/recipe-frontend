"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import RecipeCard from "../components/RecipeCard";
import api from "../services/api";

export default function MyRecipes() {
    const { token } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");

    const fetchRecipes = async () => {
        if (!token) return;
        try {
            const res = await api.get("/recipes/my", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [token]);

    const filteredRecipes = recipes.filter((r: any) =>
        r.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Recipes</h1>

            <input
                type="text"
                placeholder="Search my recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {filteredRecipes.length > 0 ? (
                <div className="grid gap-4">
                    {filteredRecipes.map((r: any) => (
                        <RecipeCard key={r.id} recipe={r} onRated={fetchRecipes} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No recipes found.</p>
            )}
        </div>
    );
}
