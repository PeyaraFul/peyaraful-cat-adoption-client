"use client";

import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { useReceivedRequests, useApproveRequest, useRejectRequest } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaCheck, FaTimes, FaInbox } from "react-icons/fa";

export default function AdoptionRequestsPage() {
  const { loading: authLoading } = useAuth();
  const { data: requests, isLoading } = useReceivedRequests();
  const approveRequest = useApproveRequest();
  const rejectRequest = useRejectRequest();

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pending = requests?.filter((r) => r.status === "pending") || [];
  const processed = requests?.filter((r) => r.status !== "pending") || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Adoption Requests</h1>
          <p className="text-emerald-100 mt-1">Requests received for your cats</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Pending */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending ({pending.length})</h2>
          {pending.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow">
              <FaInbox className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No pending requests.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((req) => (
                <div key={req._id} className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-5">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={req.catPhoto} alt={req.catName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{req.requesterName} wants to adopt {req.catName}</h3>
                    <p className="text-sm text-gray-500">{req.requesterEmail}</p>
                    {req.message && <p className="text-sm text-gray-600 mt-2 italic">&quot;{req.message}&quot;</p>}
                    <p className="text-xs text-gray-400 mt-2">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:justify-center">
                    <button
                      onClick={() => approveRequest.mutate(req._id)}
                      disabled={approveRequest.isPending}
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => rejectRequest.mutate(req._id)}
                      disabled={rejectRequest.isPending}
                      className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-5 py-2 rounded-lg transition-colors text-sm"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Processed */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Processed ({processed.length})</h2>
          {processed.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No processed requests yet.</p>
          ) : (
            <div className="space-y-3">
              {processed.map((req) => (
                <div key={req._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={req.catPhoto} alt={req.catName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {req.requesterName} → {req.catName}
                    </p>
                    <p className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    req.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
