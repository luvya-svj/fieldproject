import React from 'react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-slate-800 rounded-2xl ${className}`}></div>
);

export const ListingCardSkeleton = () => (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-2xl" />
                <div className="space-y-2">
                    <Skeleton className="w-40 h-6" />
                    <Skeleton className="w-24 h-4" />
                </div>
            </div>
            <Skeleton className="w-20 h-8 rounded-full" />
        </div>
        <div className="space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
        </div>
        <div className="flex gap-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-12 rounded-xl" />
    </div>
);

export default Skeleton;
