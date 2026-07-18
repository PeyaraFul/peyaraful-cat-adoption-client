"use client";

import Link from "next/link";
import Image from "next/image";
import { Cat } from "@/types";

interface CatCardProps {
  cat: Cat;
}

export default function CatCard({ cat }: CatCardProps) {
  return (
    <Link
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
        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {cat.gender === "male" ? "♂ Male" : "♀ Female"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
        <p className="text-sm text-gray-500">
          {cat.breed} · {cat.age} months
        </p>
        <p className="text-sm text-emerald-600 font-medium mt-1">
          {cat.location}
        </p>
        {cat.temperament && (
          <p className="text-xs text-gray-400 mt-2 line-clamp-1">
            {cat.temperament}
          </p>
        )}
      </div>
    </Link>
  );
}
