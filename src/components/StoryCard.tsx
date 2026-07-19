"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { Story } from "@/types";
import { useLikeStory } from "@/hooks/useApi";
import { useAuth } from "@/providers/AuthProvider";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const { mutate: likeStory, isPending } = useLikeStory();
  const { user } = useAuth();
  const liked = user ? (story.likedBy || []).includes(user._id) : false;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden">
      {story.image && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={story.image}
            alt={story.catName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {story.userImage ? (
              <Image
                src={story.userImage}
                alt={story.userName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold text-sm">
                {story.userName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{story.userName}</p>
            <p className="text-xs text-gray-400">
              {new Date(story.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Adopted {story.catName}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{story.content}</p>

        <button
          onClick={() => likeStory(story._id)}
          disabled={isPending}
          className={`flex items-center gap-2 mt-4 pt-3 border-t text-sm transition-colors disabled:opacity-50 cursor-pointer w-full ${
            liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
          }`}
        >
          <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
          <span>{story.likes} likes</span>
        </button>
      </div>
    </div>
  );
}
