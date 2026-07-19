"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";
import { useInfiniteCats } from "@/hooks/useApi";
import CatCard from "@/components/CatCard";
import CatCardSkeleton from "@/components/skeletons/CatCardSkeleton";
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

export default function CatsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-10"><div className="max-w-7xl mx-auto px-4 space-y-6"><Skeleton className="h-10 w-64" /></div></div>}>
      <CatsContent />
    </Suspense>
  );
}

function CatsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [age, setAge] = useState(searchParams.get("age") || "");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filters: Record<string, string> = {};
  if (search) filters.search = search;
  if (location) filters.location = location;
  if (gender) filters.gender = gender;
  if (age) filters.age = age;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteCats(filters);
  const cats = (() => {
    const flat = data?.pages.flatMap((p) => p.cats).filter(Boolean) ?? [];
    const seen = new Set<string>();
    return flat.filter((c) => {
      if (seen.has(c._id)) return false;
      seen.add(c._id);
      return true;
    });
  })();
  const totalCount = data?.pages[0]?.total ?? 0;

  // Sync URL params on change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (gender) params.set("gender", gender);
    if (age) params.set("age", age);
    const qs = params.toString();
    router.replace(`/cats${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [search, location, gender, age, router]);

  // IntersectionObserver for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, { rootMargin: "200px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setGender("");
    setAge("");
  };

  const hasActiveFilters = search || location || gender || age;

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, breed..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
        >
          <option value="">All Genders</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
        >
          {AGE_RANGES.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Browse Cats</h1>
          <p className="text-emerald-100 mt-1">
            Find your perfect companion from {totalCount} cats
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
              {filterContent}
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed top-20 right-6 z-30">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
            >
              <FaSlidersH />
              <span className="font-semibold text-sm">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              )}
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileFilterOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <FaTimes className="text-gray-500 hover:text-gray-700 text-lg" />
                  </button>
                </div>
                {filterContent}
              </div>
            </div>
          )}

          {/* Cat Grid */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CatCardSkeleton key={i} />
                ))}
              </div>
            ) : cats.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No cats found matching your filters.</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cats.filter((c) => c?._id).map((cat) => (
                    <CatCard key={cat._id} cat={cat} />
                  ))}
                </div>

                {/* Load more trigger */}
                <div ref={loadMoreRef} className="py-8 flex justify-center">
                  {isFetchingNextPage && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <CatCardSkeleton key={i} />
                      ))}
                    </div>
                  )}
                  {!hasNextPage && cats.length > 0 && (
                    <p className="text-gray-400 text-sm">You have seen all available cats</p>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
