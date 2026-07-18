"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useUpdateProfile } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaUser, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaImage } from "react-icons/fa";

export default function ProfilePage() {
  const { user, loading: authLoading, setUser } = useAuth();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(
      { name: name.trim(), phone: phone.trim(), location: location.trim(), bio: bio.trim(), image: imageUrl.trim() },
      {
        onSuccess: (res) => {
          setUser(res.user);
        },
      }
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>

        {/* Profile Avatar Preview */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 shadow-lg">
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaUser className="text-emerald-600" />
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              Email (cannot be changed)
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaPhone className="text-emerald-600" />
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXXXXXXXX"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-emerald-600" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaInfoCircle className="text-emerald-600" />
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself..."
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 resize-none"
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaImage className="text-emerald-600" />
              Profile Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
            />
            {imageUrl && (
              <div className="mt-3">
                <img src={imageUrl} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>

          {updateProfile.isSuccess && (
            <p className="text-center text-emerald-600 font-medium">Profile updated successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}
