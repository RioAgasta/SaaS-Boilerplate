import { db } from '@/libs/DB';
import { comments, posts, postTags, tags } from '@/models/Schema';

async function reset() {
  console.log('🗑️  Resetting database...');

  try {
    await db.delete(postTags);
    await db.delete(comments);
    await db.delete(posts);
    await db.delete(tags);

    console.log('✅ Database reset completed');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  }
}

reset()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
