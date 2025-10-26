'use client';

import type { CommentWithAuthor } from '@/utils/BlogHelpers';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { useState } from 'react';
import { CommentForm, CommentsList } from '@/components/CommentSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getCommentsByPostId, getPostById, getReadingTime } from '@/utils/BlogHelpers';

type BlogPostPageProps = {
  params: {
    postId: string;
    locale: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = params;

  // Get the blog post
  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  // Get comments for this post
  const initialComments = getCommentsByPostId(postId);
  const [comments, setComments] = useState<CommentWithAuthor[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock current user - in a real app, this would come from authentication
  const currentUserId = 'alice'; // This would be the logged-in user's ID

  const readingTime = getReadingTime(post.content);

  const handleAddComment = async (content: string) => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new comment (in a real app, this would be an API call)
    const newComment: CommentWithAuthor = {
      id: `comment-${Date.now()}`,
      postId,
      userId: currentUserId,
      content,
      author: {
        id: 'd2a0b29e-5726-46ff-8a2d-5693a89b3a43',
        username: 'alice',
        first_name: 'Alice',
        last_name: 'Nguyen',
      },
    };

    setComments(prev => [...prev, newComment]);
    setIsSubmitting(false);
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, content: newContent }
          : comment,
      ),
    );
  };

  const handleDeleteComment = async (commentId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const formatContent = (content: string) => {
    return content.split(/(\*\*.*?\*\*)/).map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={part}>{part.slice(2, -2)}</strong>;
      }
      return <span key={part}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none">
              {/* Post Header */}
              <div className="not-prose mb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                      <Tag className="size-3" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {post.author.first_name[0]}
                      {post.author.last_name[0]}
                    </div>
                    <span>
                      {post.author.first_name}
                      {' '}
                      {post.author.last_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span>December 15, 2024</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>
                      {readingTime}
                      {' '}
                      min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="text-foreground">
                <div className="prose prose-lg max-w-none text-foreground">
                  {formatContent(post.content)}
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-12">
              <Separator className="mb-8" />

              <div className="space-y-8">
                <div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight">
                    Comments (
                    {comments.length}
                    )
                  </h2>
                  <p className="text-muted-foreground">
                    Join the conversation and share your thoughts on this post.
                  </p>
                </div>

                {/* Add Comment Form */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Leave a Comment</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <CommentForm
                      onSubmit={handleAddComment}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                </div>

                {/* Comments List */}
                <div>
                  <CommentsList
                    comments={comments}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                    currentUserId={currentUserId}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Info */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">About the Author</h3>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
                      {post.author.first_name[0]}
                      {post.author.last_name[0]}
                    </div>
                    <div>
                      <p className="font-medium">
                        {post.author.first_name}
                        {' '}
                        {post.author.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @
                        {post.author.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Stats */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Post Details</h3>
                </div>
                <div className="p-6 pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reading time</span>
                    <span className="text-sm font-medium">
                      {readingTime}
                      {' '}
                      min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Comments</span>
                    <span className="text-sm font-medium">{comments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tags</span>
                    <span className="text-sm font-medium">{post.tags.length}</span>
                  </div>
                </div>
              </div>

              {/* Share Actions */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">Share this post</h3>
                </div>
                <div className="p-6 pt-0">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                        Share on Twitter
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                        Share on LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
