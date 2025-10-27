import { sql } from 'drizzle-orm';
import { apiError, apiSuccess } from '@/libs/api-response';
import { db } from '@/libs/DB';
import { tags } from '@/models/Schema';

// GET /api/tags - Get all tags
export async function GET() {
  try {
    const allTags = await db
      .select()
      .from(tags)
      .orderBy(sql`${tags.name} ASC`);

    return apiSuccess(allTags, 'Tags retrieved successfully');
  } catch (error) {
    console.error('Error fetching tags:', error);
    return apiError('Failed to fetch tags', 'FETCH_TAGS_ERROR', 500);
  }
}
