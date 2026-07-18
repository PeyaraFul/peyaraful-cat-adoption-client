"use client";

import { useMemo } from "react";
import { useAdminCats, useAdminUsers } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaCat, FaUsers, FaCheckCircle, FaChartBar } from "react-icons/fa";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  available: "#10b981",
  pending: "#f59e0b",
  adopted: "#3b82f6",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthYear(dateStr: string) {
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function AdminDashboardPage() {
  const { data: cats, isLoading: catsLoading } = useAdminCats();
  const { data: users, isLoading: usersLoading } = useAdminUsers();

  const isLoading = catsLoading || usersLoading;

  const stats = useMemo(() => {
    if (!cats || !users) return null;
    const totalCats = cats.length;
    const totalUsers = users.length;
    const totalAdoptions = cats.filter((c) => c.status === "adopted").length;
    return { totalCats, totalUsers, totalAdoptions };
  }, [cats, users]);

  // 13.2 — Pie chart: cat status distribution
  const statusData = useMemo(() => {
    if (!cats) return [];
    const counts: Record<string, number> = { available: 0, pending: 0, adopted: 0 };
    cats.forEach((c) => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [cats]);

  // 13.3 — Bar chart: cats listed per month
  const catsPerMonth = useMemo(() => {
    if (!cats) return [];
    const map: Record<string, number> = {};
    cats.forEach((c) => {
      const key = getMonthYear(c.createdAt);
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([month, count]) => ({ month, count }));
  }, [cats]);

  // 13.4 — Line chart: user registrations over time
  const usersPerMonth = useMemo(() => {
    if (!users) return [];
    const map: Record<string, number> = {};
    users.forEach((u) => {
      const key = getMonthYear(u.createdAt);
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([month, count]) => ({ month, count }));
  }, [users]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-emerald-100 mt-1">Overview of platform activity</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* 13.1 — Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <FaCat className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cats</p>
              <p className="text-3xl font-extrabold text-gray-900">{stats?.totalCats ?? 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
              <FaUsers className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-extrabold text-gray-900">{stats?.totalUsers ?? 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Successful Adoptions</p>
              <p className="text-3xl font-extrabold text-gray-900">{stats?.totalAdoptions ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 13.2 — Pie Chart: Cat Status Distribution */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-emerald-600" /> Cat Status Distribution
            </h2>
            {statusData.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No cats data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name.toLowerCase()] || "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 13.3 — Bar Chart: Cats Listed Per Month */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-blue-600" /> Cats Listed Per Month
            </h2>
            {catsPerMonth.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No cats data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={catsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 13.4 — Line Chart: User Registrations Over Time */}
          <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartBar className="text-purple-600" /> User Registrations Over Time
            </h2>
            {usersPerMonth.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No user data.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={usersPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
