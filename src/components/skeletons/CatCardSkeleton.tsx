"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function CatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
