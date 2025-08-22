"use client";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function BrowseRecipes() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const fetchRecipes = async () => {
        try {
            const res = await api.get("/recipes");
            setRecipes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchRecipes(); }, []);

    const filteredRecipes = recipes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

    return (

        <div>
            <Navbar onSearch={setSearch} />
            <div className="p-4">

                {filteredRecipes.length ? (
                    <div className="grid gap-4">
                        {filteredRecipes.map(r => <RecipeCard key={r.id} recipe={r} onRated={fetchRecipes} />)}
                    </div>
                ) : (
                    <p className="text-gray-500">No recipes found.</p>
                )}
            </div>
        </div>
    );
}
