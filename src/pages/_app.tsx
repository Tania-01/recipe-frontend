import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import {RecipeProvider} from "@/context/RecipeContext";

// import "../global.css"


export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <RecipeProvider>
                <Navbar/>
                <Component {...pageProps} />
            </RecipeProvider>
        </AuthProvider>
    );
}
