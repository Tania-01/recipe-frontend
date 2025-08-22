export interface User {
    id: number;
    name: string;
    email: string;
}
export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    imageUrl?: string;
    rating: number;
    author: User;
    notes?: Note[];
}

export interface Note {
    id: number;
    recipeId: number;
    text: string;
    userId: number;
}
