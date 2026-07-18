"use client";

import { useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useAdminUsers, useDeleteUser } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAdminUsers();
  const deleteUser = useDeleteUser();
  const [search, setSearch] = useState("");

  const filtered = users?.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"?`)) return;
    deleteUser.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-emerald-100 mt-1">{users?.length ?? 0} total users</p>
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
            placeholder="Search by name or email..."
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
          <p className="text-gray-500 text-center py-10">No users found.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Joined</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          disabled={user.role === "admin"}
                          className="text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
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
