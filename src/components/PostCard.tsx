import type { Post } from '@/types/Post';

import { MessageCircle } from 'lucide-react';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 text-xs font-semibold text-blue-700 transition-all group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white dark:from-blue-900 dark:to-indigo-900 dark:text-blue-300 dark:group-hover:from-blue-600 dark:group-hover:to-indigo-600"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="mb-4 flex-grow line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {post.content}
        </p>

        {/* Footer with Author and Comments */}
        <div className="mt-auto space-y-3">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">
                {post.userId.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                @
                {post.userId}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <MessageCircle className="size-4" />
              <span className="font-medium">
                {post.comments.length}
              </span>
            </div>
          </div>

          {/* Read More Indicator */}
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-all group-hover:opacity-100 dark:text-blue-400">
            <span>Read more</span>
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};
