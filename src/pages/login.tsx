"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
    const { login, token } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            console.log("JWT token after login:", token || localStorage.getItem("token")); // ✅ виводимо токен
            router.push("/");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 rounded">
            <h1 className="text-xl mb-4">Login</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>

    );
}

