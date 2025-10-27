import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { apiError, apiSuccess } from '@/libs/api-response';
import { db } from '@/libs/DB';
import { comments } from '@/models/Schema';

type Params = {
  params: Promise<{
    commentId: string;
  }>;
};

// DELETE /api/comments/[commentId] - Delete comment
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { commentId } = await params;

    // Check if comment exists and belongs to user
    const [existingComment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!existingComment) {
      return apiError('Comment not found', 'COMMENT_NOT_FOUND', 404);
    }

    if (existingComment.userId !== userId) {
      return apiError('Forbidden: You can only delete your own comments', 'FORBIDDEN', 403);
    }

    // Delete comment
    await db.delete(comments).where(eq(comments.id, commentId));

    return apiSuccess(null, 'Comment deleted successfully');
  } catch (error) {
    console.error('Error deleting comment:', error);
    return apiError('Failed to delete comment', 'DELETE_COMMENT_ERROR', 500);
  }
}
