"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/cats?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/cats");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Find Your Perfect
            <span className="block text-yellow-300">Cat Companion</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            Open your heart and home to a cat in need. Browse adoptable cats,
            read their stories, and give them a loving forever home.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          >
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cats by name, breed, or location..."
                className="w-full pl-11 pr-4 py-4 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-colors text-base"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
