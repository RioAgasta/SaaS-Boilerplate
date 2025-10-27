'use client';

import { ArrowLeft, Calendar, Facebook, Link2, Linkedin, MessageCircle, Twitter, User } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ExportPDFButton } from '@/components/ExportPDFButton';
import { Button } from '@/components/ui/button';
import { posts as dummyPosts, users } from '@/data/dummy';
import { Section } from '@/features/landing/Section';
import { BlogNavbar } from '@/templates/BlogNavbar';

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;

  // Find post by ID
  const post = dummyPosts.find(p => p.id === postId);

  // Find author
  const author = post ? users.find(u => u.username === post.userId) : null;

  // Mock comment functionality
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) {
    return (
      <>
        <BlogNavbar />
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Section className="py-12">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                Post Not Found
              </h1>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                The post you're looking for doesn't exist.
              </p>
              <Link href="/blogs">
                <Button>Back to Blog</Button>
              </Link>
            </div>
          </Section>
        </div>
      </>
    );
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment = {
      id: `comment-${Date.now()}`,
      postId: post.id,
      userId: 'alice',
      content: newComment,
    };

    setComments([...comments, comment]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Share functions
  const shareToTwitter = () => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    // Using browser notification instead of alert
    if ('Notification' in window && Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('Link copied to clipboard!');
    }
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Back Button */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <Section className="py-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          </Section>
        </div>

        <Section className="py-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8 dark:border-gray-800">
                <div className="flex size-12 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white dark:bg-white dark:text-gray-900">
                  {post.userId.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {author
                      ? `${author.first_name} ${author.last_name}`
                      : post.userId}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {formatDate(new Date())}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3.5" />
                      {comments.length}
                      {' '}
                      comments
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={`para-${index}-${paragraph.slice(0, 20)}`} className="mb-4 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Comments Section */}
              <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                  Comments (
                  {comments.length}
                  )
                </h2>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="mb-8">
                  <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-600"
                  />
                  <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length === 0
                    ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                          No comments yet. Be the first to comment!
                        </p>
                      )
                    : (
                        comments.map(comment => (
                          <div
                            key={comment.id}
                            className="border-b border-gray-100 pb-6 last:border-0 dark:border-gray-800"
                          >
                            <div className="mb-2 flex items-center gap-3">
                              <div className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900">
                                {comment.userId.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  @
                                  {comment.userId}
                                </p>
                              </div>
                            </div>
                            <p className="ml-13 text-gray-700 dark:text-gray-300">
                              {comment.content}
                            </p>
                          </div>
                        ))
                      )}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Author Card */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-4 flex items-center gap-3">
                    <User className="size-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      About the Author
                    </h3>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white dark:bg-white dark:text-gray-900">
                      {post.userId.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {author
                          ? `${author.first_name} ${author.last_name}`
                          : post.userId}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        @
                        {post.userId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Share Article
                  </h3>
                  <div className="space-y-2">
                    <Button
                      onClick={shareToTwitter}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Twitter className="mr-2 size-4" />
                      Share on Twitter
                    </Button>
                    <Button
                      onClick={shareToFacebook}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Facebook className="mr-2 size-4" />
                      Share on Facebook
                    </Button>
                    <Button
                      onClick={shareToLinkedIn}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Linkedin className="mr-2 size-4" />
                      Share on LinkedIn
                    </Button>
                    <Button
                      onClick={copyLink}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Link2 className="mr-2 size-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>

                {/* Export PDF Button */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Save Article
                  </h3>
                  <ExportPDFButton
                    postId={post.id}
                    postTitle={post.title}
                    postContent={post.content}
                    authorName={author ? `${author.first_name} ${author.last_name}` : post.userId}
                    tags={post.tags.map(tag => tag.name)}
                    createdAt={new Date()}
                  />
                </div>

                {/* Post Stats */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Post Statistics
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Comments</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {comments.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tags</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {post.tags.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      </div>
    </>
  );
}
