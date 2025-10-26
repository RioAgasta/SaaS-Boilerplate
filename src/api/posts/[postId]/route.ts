import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { apiError, apiSuccess } from '@/libs/api-response';
import { db } from '@/libs/DB';
import { comments, posts, postTags, tags } from '@/models/Schema';
import { updatePostSchema } from '@/types/Post';

type Params = {
  params: Promise<{
    postId: string;
  }>;
};

// GET /api/posts/[postId] - Get single post
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { postId } = await params;

    const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!post) {
      return apiError('Post not found', 'POST_NOT_FOUND', 404);
    }

    // Get tags
    const postTagsData = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(postTags)
      .innerJoin(tags, eq(postTags.tagId, tags.id))
      .where(eq(postTags.postId, postId));

    // Get comments
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(sql`${comments.createdAt} ASC`);

    return apiSuccess(
      {
        ...post,
        tags: postTagsData,
        comments: postComments,
      },
      'Post retrieved successfully',
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return apiError('Failed to fetch post', 'FETCH_POST_ERROR', 500);
  }
}

// PUT /api/posts/[postId] - Update post
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { postId } = await params;

    // Check if post exists and belongs to user
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!existingPost) {
      return apiError('Post not found', 'POST_NOT_FOUND', 404);
    }

    if (existingPost.userId !== userId) {
      return apiError('Forbidden: You can only edit your own posts', 'FORBIDDEN', 403);
    }

    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);

    // Update post fields
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (validatedData.title) {
      updateData.title = validatedData.title;
    }
    if (validatedData.content) {
      updateData.content = validatedData.content;
    }

    const [updatedPost] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, postId))
      .returning();

    // Update tags if provided
    let tagObjects = [];
    if (validatedData.tags) {
      // Delete existing post-tag relations
      await db.delete(postTags).where(eq(postTags.postId, postId));

      // Add new tags
      for (const tagName of validatedData.tags) {
        const normalizedTag = tagName.toLowerCase().trim();

        let [existingTag] = await db
          .select()
          .from(tags)
          .where(eq(tags.name, normalizedTag))
          .limit(1);

        if (!existingTag) {
          [existingTag] = await db.insert(tags).values({ name: normalizedTag }).returning();
        }

        tagObjects.push(existingTag);

        await db.insert(postTags).values({
          postId: updatedPost!.id,
          tagId: existingTag!.id,
        });
      }
    } else {
      // Get existing tags
      tagObjects = await db
        .select({
          id: tags.id,
          name: tags.name,
        })
        .from(postTags)
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(eq(postTags.postId, postId));
    }

    // Get comments
    const postComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(sql`${comments.createdAt} ASC`);

    return apiSuccess(
      {
        ...updatedPost,
        tags: tagObjects,
        comments: postComments,
      },
      'Post updated successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(error?.errors?.[0]!.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error updating post:', error);
    return apiError('Failed to update post', 'UPDATE_POST_ERROR', 500);
  }
}

// DELETE /api/posts/[postId] - Delete post
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { postId } = await params;

    // Check if post exists and belongs to user
    const [existingPost] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);

    if (!existingPost) {
      return apiError('Post not found', 'POST_NOT_FOUND', 404);
    }

    if (existingPost.userId !== userId) {
      return apiError('Forbidden: You can only delete your own posts', 'FORBIDDEN', 403);
    }

    // Delete post (cascade will delete comments and post_tags)
    await db.delete(posts).where(eq(posts.id, postId));

    return apiSuccess(null, 'Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    return apiError('Failed to delete post', 'DELETE_POST_ERROR', 500);
  }
}
