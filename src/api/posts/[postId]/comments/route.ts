import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { apiError, apiSuccess } from '@/libs/api-response';
import { db } from '@/libs/DB';
import { comments, posts } from '@/models/Schema';
import { createCommentSchema } from '@/types/Comment';

type Params = {
  params: Promise<{
    postId: string;
  }>;
};

// POST /api/posts/[postId]/comments - Create comment
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { postId } = await params;

    // Check if post exists
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!existingPost) {
      return apiError('Post not found', 'POST_NOT_FOUND', 404);
    }

    const body = await request.json();
    const validatedData = createCommentSchema.parse(body);

    // Create comment
    const [newComment] = await db
      .insert(comments)
      .values({
        postId,
        userId,
        content: validatedData.content,
      })
      .returning();

    return apiSuccess(newComment, 'Comment created successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(error?.errors?.[0]!.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error creating comment:', error);
    return apiError('Failed to create comment', 'CREATE_COMMENT_ERROR', 500);
  }
}
