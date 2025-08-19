"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
          prefetch={true}
          onClick={() => showNotification("Welcome to VideoHub", "info")}
        >
          VideoHub
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/HomePage"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Browse
          </Link>

          {session && (
            <Link
              href="/upload"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() =>
                showNotification("Ready to upload your video!", "info")
              }
            >
              Upload
            </Link>
          )}

          {!session ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
              onClick={() =>
                showNotification("Please sign in to continue", "info")
              }
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              {/* User Button */}
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
                  {session.user?.email?.split("@")[0]}
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                <ul className="py-2 text-sm">
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
