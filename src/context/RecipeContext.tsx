"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    cuisine?: string;
}

interface RecipesContextType {
    recipes: Recipe[];
    setRecipes: (r: Recipe[]) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    return <RecipesContext.Provider value={{ recipes, setRecipes }}>{children}</RecipesContext.Provider>;
};



export const useRecipes = () => {
    const ctx = useContext(RecipesContext);
    if (!ctx) throw new Error("useRecipes must be used within RecipesProvider");
    return ctx;
};
