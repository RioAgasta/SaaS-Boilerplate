import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { apiError, apiSuccess } from '@/libs/api-response';
import { db } from '@/libs/DB';
import { comments, posts, postTags, tags } from '@/models/Schema';
import { createPostSchema } from '@/types/Post';

// GET /api/posts - Get all posts
export async function GET() {
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        userId: posts.userId,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .orderBy(sql`${posts.createdAt} DESC`);

    // Fetch tags and comments for each post
    const postsWithRelations = await Promise.all(
      allPosts.map(async (post) => {
        // Get tags
        const postTagsData = await db
          .select({
            id: tags.id,
            name: tags.name,
          })
          .from(postTags)
          .innerJoin(tags, eq(postTags.tagId, tags.id))
          .where(eq(postTags.postId, post.id));

        // Get comments
        const postComments = await db
          .select()
          .from(comments)
          .where(eq(comments.postId, post.id))
          .orderBy(sql`${comments.createdAt} ASC`);

        return {
          ...post,
          tags: postTagsData,
          comments: postComments,
        };
      }),
    );

    return apiSuccess({ data: postsWithRelations }, 'Posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching posts:', error);
    return apiError('Failed to fetch posts', 'FETCH_POSTS_ERROR', 500);
  }
}

// POST /api/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await request.json();
    const validatedData = createPostSchema.parse(body);

    // Create post
    const [newPost] = await db
      .insert(posts)
      .values({
        userId,
        title: validatedData.title,
        content: validatedData.content,
      })
      .returning();

    // Process tags
    const tagObjects = [];
    if (validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        const normalizedTag = tagName.toLowerCase().trim();

        // Check if tag exists
        let [existingTag] = await db
          .select()
          .from(tags)
          .where(eq(tags.name, normalizedTag))
          .limit(1);

        // Create tag if doesn't exist
        if (!existingTag) {
          [existingTag] = await db
            .insert(tags)
            .values({ name: normalizedTag })
            .returning();
        }

        tagObjects.push(existingTag);

        // Create post-tag relation
        await db.insert(postTags).values({
          postId: newPost!.id,
          tagId: existingTag!.id,
        });
      }
    }

    return apiSuccess(
      {
        ...newPost,
        tags: tagObjects,
        comments: [],
      },
      'Post created successfully',
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(error?.errors?.[0]!.message, 'VALIDATION_ERROR', 400);
    }
    console.error('Error creating post:', error);
    return apiError('Failed to create post', 'CREATE_POST_ERROR', 500);
  }
}
