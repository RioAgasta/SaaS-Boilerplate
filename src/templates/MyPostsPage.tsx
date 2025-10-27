'use client';

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { posts as dummyPosts } from '@/data/dummy';
import { Section } from '@/features/landing/Section';
import { BlogNavbar } from '@/templates/BlogNavbar';

export const MyPostsPage = () => {
  const router = useRouter();
  const currentUserId = 'john_doe'; // Mock current user

  // Filter posts by current user
  const myPosts = useMemo(
    () => dummyPosts.filter(post => post.userId === currentUserId),
    [currentUserId],
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (postId: string) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Are you sure you want to delete this story?')) {
      return;
    }

    setDeletingId(postId);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Delete post from backend
    // console.log('Deleting post:', postId);

    setDeletingId(null);
  };

  const handleEdit = (postId: string) => {
    router.push(`/blogs/edit/${postId}`);
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Section className="py-12">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    Your Stories
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {myPosts.length}
                    {' '}
                    {myPosts.length === 1 ? 'story' : 'stories'}
                    {' '}
                    published
                  </p>
                </div>
                <Button
                  onClick={() => router.push('/blogs/write')}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Write a story
                </Button>
              </div>
            </div>

            {/* Posts List */}
            {myPosts.length > 0
              ? (
                  <div className="space-y-8">
                    {myPosts.map(post => (
                      <article
                        key={post.id}
                        className="group border-b border-gray-200 pb-8 last:border-0 dark:border-gray-800"
                      >
                        <div className="flex gap-6">
                          {/* Content */}
                          <Link
                            href={`/blogs/${post.id}`}
                            className="flex-1"
                          >
                            <div className="mb-3">
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
                              <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                                {post.title}
                              </h2>
                              <p className="line-clamp-2 text-base text-gray-600 dark:text-gray-400">
                                {post.content}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>
                                {post.comments.length}
                                {' '}
                                {post.comments.length === 1 ? 'comment' : 'comments'}
                              </span>
                            </div>
                          </Link>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(post.id)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                              disabled={deletingId === post.id}
                              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )
              : (
                  // Empty State
                  <div className="py-24 text-center">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      No stories yet
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                      Start writing and share your thoughts with the community
                    </p>
                    <Button
                      onClick={() => router.push('/blogs/write')}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Write your first story
                    </Button>
                  </div>
                )}
          </div>
        </Section>
      </div>
    </>
  );
};
