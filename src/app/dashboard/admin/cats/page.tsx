"use client";

import { useState } from "react";
import Image from "next/image";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useAdminCats, useDeleteCatAdmin } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminCatsPage() {
  const { data: cats, isLoading } = useAdminCats();
  const deleteCat = useDeleteCatAdmin();
  const [search, setSearch] = useState("");

  const filtered = cats?.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.breed?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete cat "${name}"?`)) return;
    deleteCat.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Manage Cats</h1>
          <p className="text-emerald-100 mt-1">{cats?.length ?? 0} total cats</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, breed, or location..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
          />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : !filtered || filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No cats found.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Photo</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Breed</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Gender</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                          <Image src={cat.photo} alt={cat.name} fill className="object-cover" unoptimized />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cat.breed}</td>
                      <td className="px-6 py-4 text-sm capitalize">{cat.gender}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cat.location}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          cat.status === "available" ? "bg-green-100 text-green-700" :
                          cat.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {cat.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(cat._id, cat.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
