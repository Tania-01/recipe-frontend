"use client";
import { useEffect } from "react";
import { useRecipes } from "@/context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "@/services/api";
import Navbar from "../components/Navbar";

export default function Home() {

    const { recipes, setRecipes, searchTerm = "" } = useRecipes();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await getRecipes();
                setRecipes(res.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecipes();
    }, [setRecipes]);


    const filteredRecipes = recipes.filter(
        (r) => r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">📖 All Recipes</h1>
                {filteredRecipes.length === 0 ? (
                    <p>No recipes found</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredRecipes.map((r) => (
                            <li key={r.id}>
                                <RecipeCard recipe={r} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
