"use client";
import { useEffect } from "react";
import { useRecipes } from "@/context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import api from "../services/api";
import {useAuth} from "@/context/AuthContext";

export default function MyRecipes() {
    const { token } = useAuth();
    const { recipes, setRecipes, searchTerm = "" } = useRecipes();

    const fetchRecipes = async () => {
        if (!token) return;
        try {
            const res = await api.get("/recipes/my", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [token]);

    const filteredRecipes = recipes.filter(
        (r: any) => r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
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
        </>
    );
}
