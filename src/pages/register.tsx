"use client";

import { useState } from "react";
import axios from "../services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const router = useRouter();
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            await axios.post("/auth/register", { name, email, password });


            const loginRes = await axios.post("/auth/login", { email, password });
            const { access_token, user } = loginRes.data;

            login(user, access_token);


            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
}
