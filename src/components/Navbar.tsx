"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
    onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link href="/" className="font-semibold text-lg">All Recipes</Link>
                {user && <Link href="/my-recipes" className="font-semibold text-lg">My Recipes</Link>}
                {onSearch && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="ml-4 px-2 py-1 rounded text-black"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                )}
            </div>

            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="font-medium">{user.name}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:underline">Login</Link>
                        <Link href="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
