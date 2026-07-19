"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import Link from "next/link";
import { useCreateStory } from "@/hooks/useApi";

export default function NewStoryPage() {
  const router = useRouter();
  const createStory = useCreateStory();

  const [catName, setCatName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<{ catName?: string; content?: string; image?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!catName.trim()) errs.catName = "Cat name is required";
    if (!content.trim()) errs.content = "Story content is required";
    else if (content.trim().length < 10) errs.content = "Story must be at least 10 characters";
    if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) errs.image = "Please enter a valid URL";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createStory.mutate(
      { catName: catName.trim(), content: content.trim(), image: imageUrl || undefined },
      {
        onSuccess: () => router.push("/stories"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
        >
          <FaArrowLeft />
          Back to stories
        </Link>

        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Share Your Story</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cat Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cat Name *
              </label>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Name of the cat you adopted"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 ${errors.catName ? "border-red-500" : ""}`}
              />
              {errors.catName && <p className="text-red-500 text-sm mt-1">{errors.catName}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Story *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell us about your experience adopting this cat..."
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 resize-none ${errors.content ? "border-red-500" : ""}`}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="inline mr-1" />
                Image URL (optional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/cat-photo.jpg"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 ${errors.image ? "border-red-500" : ""}`}
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              {imageUrl && (
                <div className="mt-3 relative h-40 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={createStory.isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {createStory.isPending ? "Posting..." : "Share Story"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
