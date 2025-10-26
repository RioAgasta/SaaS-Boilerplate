import { comments as allComments, posts, users } from '@/data/dummy';

export type Post = typeof posts[0];
export type User = typeof users[0];
export type Comment = typeof allComments[0];

export type PostWithAuthor = Post & {
  author: User;
};

export type CommentWithAuthor = Comment & {
  author: User;
};

// Get a blog post by ID with author information
export function getPostById(postId: string): PostWithAuthor | null {
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return null;
  }

  const author = users.find(u => u.username === post.userId);
  if (!author) {
    return null;
  }

  return {
    ...post,
    author,
  };
}

// Get comments for a specific post with author information
export function getCommentsByPostId(postId: string): CommentWithAuthor[] {
  const postComments = allComments.filter(comment => comment.postId === postId);

  return postComments.map((comment) => {
    const author = users.find(u => u.username === comment.userId);
    return {
      ...comment,
      author: author || { id: 'unknown', username: 'Unknown', first_name: 'Unknown', last_name: 'User' },
    };
  });
}

// Get user by username
export function getUserByUsername(username: string): User | null {
  return users.find(u => u.username === username) || null;
}

// Format date for display
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get reading time estimate (rough calculation)
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
