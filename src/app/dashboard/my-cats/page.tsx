"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { useCats, useUpdateCat, useDeleteCat } from "@/hooks/useApi";
import { Cat } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";

const LOCATIONS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function MyCatsPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: cats, isLoading: catsLoading } = useCats();
  const updateCat = useUpdateCat();
  const deleteCat = useDeleteCat();

  const [editCat, setEditCat] = useState<Cat | null>(null);
  const [form, setForm] = useState({
    name: "", age: "", breed: "", photo: "", description: "",
    location: "", gender: "male", healthStatus: "", vaccinationStatus: "", temperament: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const myCats = cats?.filter((c) => c.ownerId === user?._id) || [];

  const openEdit = (cat: Cat) => {
    setEditCat(cat);
    setForm({
      name: cat.name,
      age: String(cat.age),
      breed: cat.breed,
      photo: cat.photo,
      description: cat.description,
      location: cat.location,
      gender: cat.gender,
      healthStatus: cat.healthStatus,
      vaccinationStatus: cat.vaccinationStatus,
      temperament: cat.temperament,
    });
  };

  const handleUpdate = () => {
    if (!editCat) return;
    updateCat.mutate(
      { id: editCat._id, data: { ...form, age: Number(form.age), gender: form.gender as "male" | "female" } },
      { onSuccess: () => { setEditCat(null); } }
    );
  };

  const handleDelete = (id: string) => {
    deleteCat.mutate(id, { onSuccess: () => setDeleteConfirm(null) });
  };

  if (authLoading || catsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Cats</h1>
            <p className="text-emerald-100 mt-1">{myCats.length} cat(s) listed</p>
          </div>
          <Link
            href="/dashboard/add-cat"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-3 rounded-xl transition-colors"
          >
            <FaPlus /> Add Cat
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {myCats.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">You haven&apos;t listed any cats yet.</p>
            <Link
              href="/dashboard/add-cat"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <FaPlus /> Add Your First Cat
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCats.map((cat) => (
              <div key={cat._id} className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="relative h-48">
                  <Image src={cat.photo} alt={cat.name} fill className="object-cover" unoptimized />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                    cat.status === "available" ? "bg-emerald-500 text-white" :
                    cat.status === "pending" ? "bg-yellow-500 text-gray-900" :
                    "bg-blue-500 text-white"
                  }`}>
                    {cat.status.charAt(0).toUpperCase() + cat.status.slice(1)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.breed} · {cat.age} months · {cat.gender}</p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">{cat.location}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openEdit(cat)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-2 rounded-lg transition-colors text-sm"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(cat._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 rounded-lg transition-colors text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editCat} onClose={() => setEditCat(null)} title="Edit Cat">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age (months) *</label>
              <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Breed *</label>
            <input value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL *</label>
            <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
            <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900">
              <option value="">Select location</option>
              {LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Health Status</label>
              <input value={form.healthStatus} onChange={(e) => setForm({ ...form, healthStatus: e.target.value })}
                placeholder="e.g. Healthy"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Vaccination</label>
              <input value={form.vaccinationStatus} onChange={(e) => setForm({ ...form, vaccinationStatus: e.target.value })}
                placeholder="e.g. Fully vaccinated"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Temperament</label>
            <input value={form.temperament} onChange={(e) => setForm({ ...form, temperament: e.target.value })}
              placeholder="e.g. Friendly, playful"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>
          <button
            onClick={handleUpdate}
            disabled={updateCat.isPending || !form.name || !form.age || !form.breed || !form.photo || !form.location}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {updateCat.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Cat">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this cat listing? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteConfirm(null)}
            className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            disabled={deleteCat.isPending}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
          >
            {deleteCat.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
