"use client";

import { useStories } from "@/hooks/useApi";
import StoryCard from "@/components/StoryCard";
import StoryCardSkeleton from "@/components/skeletons/StoryCardSkeleton";

export default function StoriesPage() {
  const { data: stories, isLoading } = useStories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Success Stories</h1>
          <p className="text-emerald-100 mt-1">
            Heartwarming tales from happy adopters
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <StoryCardSkeleton key={i} />
            ))}
          </div>
        ) : !stories || stories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No stories yet. Be the first to share yours!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
