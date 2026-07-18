"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useAdminAdoptions } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

const STATUS_OPTIONS = ["", "pending", "approved", "rejected"];

export default function AdminAdoptionPage() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const { data: adoptions, isLoading } = useAdminAdoptions(status || undefined);

  const filtered = adoptions?.filter(
    (a) =>
      a.catName?.toLowerCase().includes(search.toLowerCase()) ||
      a.requesterName?.toLowerCase().includes(search.toLowerCase()) ||
      a.requesterEmail?.toLowerCase().includes(search.toLowerCase()) ||
      a.ownerName?.toLowerCase().includes(search.toLowerCase()) ||
      a.ownerEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Adoption Requests</h1>
          <p className="text-emerald-100 mt-1">{adoptions?.length ?? 0} total requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 w-full sm:w-48"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by cat, requester, or owner..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : !filtered || filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No adoption requests found.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Cat</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Requester</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Owner</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((adoption) => (
                    <tr key={adoption._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image src={adoption.catPhoto} alt={adoption.catName} fill className="object-cover" unoptimized />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{adoption.catName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{adoption.requesterName}</p>
                        <p className="text-xs text-gray-500">{adoption.requesterEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{adoption.ownerName}</p>
                        <p className="text-xs text-gray-500">{adoption.ownerEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor(adoption.status)}`}>
                          {adoption.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(adoption.createdAt).toLocaleDateString()}
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
