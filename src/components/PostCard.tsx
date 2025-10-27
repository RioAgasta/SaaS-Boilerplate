'use client';

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Array<{ id: number; name: string }>;
  comments: any[];
};

type PostCardProps = {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  currentUserId?: string;
};

export function PostCard({
  post,
  onEdit,
  onDelete,
  currentUserId = 'john_doe',
}: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOwner = post.userId === currentUserId;

  return (
    <article
      className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit/Delete Buttons - Only for owner */}
      {isOwner && isHovered && (
        <div className="absolute right-4 top-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onEdit?.(post);
            }}
          >
            <Edit className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onDelete?.(post.id);
            }}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}

      <Link href={`/blogs/${post.id}`}>
        {/* Author */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
            {post.userId.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              @
              {post.userId}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>
            {post.comments.length}
            {' '}
            {post.comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </Link>
    </article>
  );
}
