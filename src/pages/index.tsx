"use client";
import { useEffect } from "react";
import { useRecipes } from "@/context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import {getRecipes} from "@/services/api";

export default function Home() {
    const { recipes, setRecipes } = useRecipes();

    useEffect(() => {


        const fetchRecipes = async () => {
            try {
                const res = await getRecipes();
                setRecipes(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecipes();
    }, [setRecipes]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📖 All Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes yet</p>
            ) : (
                <ul className="space-y-4">
                    {recipes.map((r) => (
                        <li key={r.id}>
                            <RecipeCard recipe={r} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
