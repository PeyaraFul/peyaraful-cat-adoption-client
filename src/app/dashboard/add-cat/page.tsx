"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useCreateCat } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";

const LOCATIONS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function AddCatPage() {
  const { loading: authLoading } = useAuth();
  const createCat = useCreateCat();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", age: "", breed: "", photo: "", description: "",
    location: "", gender: "male", healthStatus: "Healthy",
    vaccinationStatus: "Not vaccinated", temperament: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCat.mutate(
      { ...form, age: Number(form.age) },
      { onSuccess: () => router.push("/dashboard/my-cats") }
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[600px] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Add New Cat</h1>
          <p className="text-emerald-100 mt-1">List a cat for adoption</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              placeholder="Cat's name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age (months) *</label>
              <input name="age" type="number" value={form.age} onChange={handleChange} required min="1"
                placeholder="e.g. 12"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Breed *</label>
            <input name="breed" value={form.breed} onChange={handleChange} required
              placeholder="e.g. Persian, Siamese, Mixed"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL *</label>
            <input name="photo" value={form.photo} onChange={handleChange} required type="url"
              placeholder="https://example.com/cat.jpg"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
            <select name="location" value={form.location} onChange={handleChange} required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900">
              <option value="">Select location</option>
              {LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              placeholder="Tell us about this cat..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Health Status</label>
              <input name="healthStatus" value={form.healthStatus} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Vaccination Status</label>
              <input name="vaccinationStatus" value={form.vaccinationStatus} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Temperament</label>
            <input name="temperament" value={form.temperament} onChange={handleChange}
              placeholder="e.g. Friendly, playful, calm"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900" />
          </div>

          <button
            type="submit"
            disabled={createCat.isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {createCat.isPending ? "Creating..." : "Add Cat"}
          </button>
        </form>
      </div>
    </div>
  );
}
