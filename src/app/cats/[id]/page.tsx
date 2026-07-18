"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useCat } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: cat, isLoading, error } = useCat(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Cat not found</p>
          <Link href="/cats" className="text-emerald-600 hover:underline">
            Back to browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/cats"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
        >
          <FaArrowLeft />
          Back to cats
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Photo */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={cat.photo}
              alt={cat.name}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <span className="absolute top-4 right-4 bg-emerald-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
              {cat.gender === "male" ? "♂ Male" : "♀ Female"}
            </span>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{cat.name}</h1>
              <p className="text-gray-500 mt-1">{cat.breed}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 uppercase font-semibold">Age</p>
                <p className="text-lg font-bold text-gray-900">{cat.age} months</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 uppercase font-semibold">Gender</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{cat.gender}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 uppercase font-semibold">Health</p>
                <p className="text-lg font-bold text-gray-900">{cat.healthStatus || "Healthy"}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 uppercase font-semibold">Vaccination</p>
                <p className="text-lg font-bold text-gray-900">{cat.vaccinationStatus || "Not vaccinated"}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-emerald-600" />
              <span>{cat.location}</span>
            </div>

            {/* Description */}
            {cat.description && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{cat.description}</p>
              </div>
            )}

            {/* Temperament */}
            {cat.temperament && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase mb-2">Temperament</h2>
                <p className="text-gray-600">{cat.temperament}</p>
              </div>
            )}

            {/* Request to Adopt */}
            <div className="pt-4 border-t">
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                <FaHeart />
                Request to Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
