import type { Post } from '@/types/Post';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/blogs/${post.id}`}>
      <article className="group cursor-pointer border-b border-gray-200 pb-8 transition-opacity hover:opacity-75 dark:border-gray-800">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="mb-4 line-clamp-2 text-base text-gray-600 dark:text-gray-400">
          {post.content}
        </p>

        {/* Footer with Author and Comments */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
              {post.userId.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              @
              {post.userId}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MessageCircle className="size-4" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
