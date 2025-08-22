import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import {RecipesProvider} from "@/context/RecipeContext";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <RecipesProvider>
                <Component {...pageProps} />
            </RecipesProvider>
        </AuthProvider>
    );
}
