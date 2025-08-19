import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Share Your <span className="text-blue-600">Videos</span> with the World
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          Upload, manage, and explore videos easily with Next.js, MongoDB, and ImageKit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/upload"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            Upload a Video
          </Link>
          <Link
            href="/HomePage"
            className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            Browse Videos
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} VideoHub. Built with Next.js & MongoDB. By Ahmad Razzaq
      </footer>
    </div>
  );
}
