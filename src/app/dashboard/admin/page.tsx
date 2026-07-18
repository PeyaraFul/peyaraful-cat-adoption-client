"use client";

import { useAdminStats } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaCat, FaUsers, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#059669", "#f59e0b", "#3b82f6", "#ef4444"];

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const catStatusData = [
    { name: "Available", value: stats?.catsByStatus?.available || 0 },
    { name: "Pending", value: stats?.catsByStatus?.pending || 0 },
    { name: "Adopted", value: stats?.catsByStatus?.adopted || 0 },
  ];

  const summaryCards = [
    { label: "Total Cats", value: stats?.totalCats ?? 0, icon: <FaCat />, color: "bg-emerald-100 text-emerald-700" },
    { label: "Total Users", value: stats?.totalUsers ?? 0, icon: <FaUsers />, color: "bg-blue-100 text-blue-700" },
    { label: "Adopted", value: stats?.totalAdoptions ?? 0, icon: <FaCheckCircle />, color: "bg-purple-100 text-purple-700" },
    { label: "Pending", value: stats?.pendingAdoptions ?? 0, icon: <FaClock />, color: "bg-yellow-100 text-yellow-700" },
    { label: "Rejected", value: stats?.rejectedAdoptions ?? 0, icon: <FaTimesCircle />, color: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-emerald-100 mt-1">Overview of your platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {summaryCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl shadow p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${card.color} mb-3`}>
                {card.icon}
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart - Cat Status */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cat Status Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={catStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {catStatusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Cats Per Month */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cats Listed Per Month</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats?.catsPerMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - User Registrations */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">User Registrations</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stats?.usersPerMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
