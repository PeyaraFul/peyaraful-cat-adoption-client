"use client";

import Link from "next/link";
import { FaCat, FaPaperPlane, FaInbox, FaPlus, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";
import { useCats, useSentRequests, useReceivedRequests } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: cats, isLoading: catsLoading } = useCats();
  const { data: sent, isLoading: sentLoading } = useSentRequests();
  const { data: received, isLoading: receivedLoading } = useReceivedRequests();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const myCats = cats?.filter((c) => c.ownerId === user?._id) || [];
  const pendingSent = sent?.filter((r) => r.status === "pending") || [];
  const pendingReceived = received?.filter((r) => r.status === "pending") || [];

  const cards = [
    {
      title: "My Cats",
      count: myCats.length,
      icon: <FaCat className="text-2xl" />,
      color: "bg-emerald-100 text-emerald-700",
      link: "/dashboard/my-cats",
    },
    {
      title: "My Requests",
      count: pendingSent.length,
      icon: <FaPaperPlane className="text-2xl" />,
      color: "bg-blue-100 text-blue-700",
      link: "/dashboard/my-requests",
    },
    {
      title: "Received Requests",
      count: pendingReceived.length,
      icon: <FaInbox className="text-2xl" />,
      color: "bg-yellow-100 text-yellow-700",
      link: "/dashboard/adoption-requests",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-emerald-100 mt-1">
            Welcome back, {user?.name || "User"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow p-6 flex items-center gap-5"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {catsLoading || sentLoading || receivedLoading ? (
                    <Skeleton className="h-8 w-12 inline-block" />
                  ) : (
                    card.count
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/add-cat"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <FaPlus />
              Add New Cat
            </Link>
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              href="/dashboard/stories/new"
              className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Share a Story
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <FaShieldAlt />
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
