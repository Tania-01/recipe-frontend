// src/services/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",

    headers: {
        "Content-Type": "application/json",
    },
});


export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export const getRecipes = () => api.get("/recipes");


export const searchRecipes = (name: string) =>
    api.get(`/recipes/search?name=${encodeURIComponent(name)}`);


export const createRecipe = (data: any, token: string) =>
    api.post("/recipes", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const rateRecipe = (id: number, rating: number, token: string) =>
    api.post(
        `/recipes/${id}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
    );

export default api;
