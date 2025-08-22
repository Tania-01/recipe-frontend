import { createContext, useContext, useState, ReactNode } from "react";

interface RecipeContextType {
    user: { name: string } | null;
    setUser: (user: any) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    recipes: any[];
    setRecipes: (recipes: any[]) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [recipes, setRecipes] = useState<any[]>([]);

    return (
        <RecipeContext.Provider value={{ user, setUser, searchTerm, setSearchTerm, recipes, setRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) throw new Error("useRecipes must be used within a RecipeProvider");
    return context;
};
