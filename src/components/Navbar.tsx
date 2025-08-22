"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

interface NavbarProps {
    onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) onSearch(value);
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-6">
                <Link href="/" className="font-bold text-xl hover:text-gray-200 transition">All Recipes</Link>
                {user && <Link href="/my-recipes" className="hover:text-gray-200 transition">My Recipes</Link>}
                {user && <Link href="/add-recipe" className="hover:text-gray-200 transition">Add Recipe</Link>}
                {onSearch && (
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="ml-4 px-3 py-1 rounded text-black outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                )}
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="font-medium">{user.name}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition">Login</Link>
                        <Link href="/register" className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
