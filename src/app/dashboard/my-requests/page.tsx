"use client";

import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { useSentRequests } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaPaperPlane } from "react-icons/fa";

export default function MyRequestsPage() {
  const { loading: authLoading } = useAuth();
  const { data: requests, isLoading } = useSentRequests();

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pending = requests?.filter((r) => r.status === "pending") || [];
  const approved = requests?.filter((r) => r.status === "approved") || [];
  const rejected = requests?.filter((r) => r.status === "rejected") || [];

  const statusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-emerald-100 text-emerald-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Requests</h1>
          <p className="text-emerald-100 mt-1">Your adoption requests</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Pending */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending ({pending.length})</h2>
          {pending.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow">
              <FaPaperPlane className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No pending requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((req) => (
                <div key={req._id} className="bg-white rounded-2xl shadow p-5 flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={req.catPhoto} alt={req.catName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">Requested to adopt {req.catName}</p>
                    <p className="text-sm text-gray-500">Owner: {req.ownerName} ({req.ownerEmail})</p>
                    {req.message && <p className="text-sm text-gray-600 mt-1 italic">&quot;{req.message}&quot;</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(req.status)}`}>
                    Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Approved */}
        {approved.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Approved ({approved.length})</h2>
            <div className="space-y-3">
              {approved.map((req) => (
                <div key={req._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={req.catPhoto} alt={req.catName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{req.catName} — {req.ownerName}</p>
                    <p className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(req.status)}`}>
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rejected */}
        {rejected.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rejected ({rejected.length})</h2>
            <div className="space-y-3">
              {rejected.map((req) => (
                <div key={req._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={req.catPhoto} alt={req.catName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{req.catName} — {req.ownerName}</p>
                    <p className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(req.status)}`}>
                    Rejected
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {!requests || requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow">
            <FaPaperPlane className="text-4xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">You haven&apos;t sent any adoption requests yet.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
