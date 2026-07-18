"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaHeart, FaUsers, FaCat, FaPaw } from "react-icons/fa";
import { useCats, useTopStories, usePublicStats } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

const LOCATIONS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];
const GENDERS = ["male", "female"];
const AGE_RANGES = [
  { label: "Any Age", value: "" },
  { label: "0-6 months", value: "6" },
  { label: "0-12 months", value: "12" },
  { label: "0-24 months", value: "24" },
  { label: "0-36 months", value: "36" },
  { label: "3+ years", value: "60" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const { data: cats, isLoading: catsLoading } = useCats();
  const { data: stories, isLoading: storiesLoading } = useTopStories();
  const { data: stats, isLoading: statsLoading } = usePublicStats();

  const latestCats = cats?.slice(0, 6) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location) params.set("location", location);
    if (gender) params.set("gender", gender);
    if (age) params.set("age", age);
    const qs = params.toString();
    router.push(`/cats${qs ? `?${qs}` : ""}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 text-white overflow-hidden">
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

            <form
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4"
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cats by name, breed, or description..."
                  className="w-full pl-11 pr-4 py-4 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                >
                  <option value="">All Genders</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                  ))}
                </select>

                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                >
                  {AGE_RANGES.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-colors text-base"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Latest Cats</h2>
            <p className="text-gray-600 mt-2">Meet our newest cat friends looking for a home</p>
          </div>

          {catsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : latestCats.length === 0 ? (
            <p className="text-center text-gray-500">No cats available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestCats.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/cats/${cat._id}`}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={cat.photo}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.breed} · {cat.age} months · {cat.gender}</p>
                    <p className="text-sm text-emerald-600 font-medium mt-1">{cat.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/cats"
              className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              View All Cats
            </Link>
          </div>
        </div>
      </section>

      {/* Top Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="text-gray-600 mt-2">Heartwarming tales from happy adopters</p>
          </div>

          {storiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : !stories || stories.length === 0 ? (
            <p className="text-center text-gray-500">No stories yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div
                  key={story._id}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  {story.image && (
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={story.image}
                        alt={story.catName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {story.userName} adopted {story.catName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{story.content}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <FaHeart className="text-red-400" />
                    <span>{story.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/stories"
              className="inline-block px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold rounded-xl transition-colors"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Community</h2>
            <p className="text-emerald-100 mt-2">Growing together, one cat at a time</p>
          </div>

          {statsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-12 w-12 mx-auto rounded-full bg-emerald-600" />
                  <Skeleton className="h-10 w-24 mx-auto bg-emerald-600" />
                  <Skeleton className="h-4 w-32 mx-auto bg-emerald-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FaCat className="text-2xl text-emerald-800" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold">{stats?.totalCats ?? 0}</p>
                <p className="text-emerald-100">Cats Available</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FaPaw className="text-2xl text-emerald-800" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold">{stats?.totalAdoptions ?? 0}</p>
                <p className="text-emerald-100">Successful Adoptions</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FaUsers className="text-2xl text-emerald-800" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold">{stats?.totalUsers ?? 0}</p>
                <p className="text-emerald-100">Registered Users</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cat Health Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Cat Health Tips</h2>
            <p className="text-gray-600 mt-2">Keep your feline friend healthy and happy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Regular Vet Visits", desc: "Schedule annual check-ups to catch health issues early. Vaccinations and dental cleanings are essential.", icon: "🩺" },
              { title: "Balanced Diet", desc: "Feed high-quality cat food appropriate for their age. Always provide fresh, clean water.", icon: "🍽️" },
              { title: "Daily Exercise", desc: "Engage your cat with interactive toys for at least 15 minutes daily to prevent obesity.", icon: "🏃" },
              { title: "Grooming Routine", desc: "Brush your cat regularly to reduce hairballs and maintain a healthy coat.", icon: "✨" },
            ].map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cat Training Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Cat Training Tips</h2>
            <p className="text-gray-600 mt-2">Simple tips to help your cat adjust to their new home</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Litter Box Training", desc: "Most cats adapt quickly. Place the box in a quiet location and keep it clean daily.", icon: "📦" },
              { title: "Scratching Posts", desc: "Provide scratching posts to save your furniture. Reward your cat when they use them.", icon: "🪵" },
              { title: "Positive Reinforcement", desc: "Use treats and praise to reward good behavior. Never punish — cats respond to patience.", icon: " Treats" },
              { title: "Safe Spaces", desc: "Create cozy hiding spots with boxes or cat trees so your cat feels secure in their new environment.", icon: "🏠" },
            ].map((tip) => (
              <div key={tip.title} className="bg-emerald-50 rounded-2xl p-6 shadow hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
