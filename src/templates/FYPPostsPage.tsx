'use client';

import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Background } from '@/components/Background';
import { PostCard } from '@/components/PostCard';
import { SearchFilter } from '@/components/SearchFilter';
import { tags as allTags, posts } from '@/data/dummy';
import { Section } from '@/features/landing/Section';

export const FYPPostsPage = () => {
  const t = useTranslations('FYPPosts');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tag names for quick select
  const availableTags = useMemo(
    () => Array.from(new Set(allTags.map(tag => tag.name))),
    [],
  );

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by search query (title or content)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query)
          || post.content.toLowerCase().includes(query),
      );
    }

    // Filter by selected tags (AND logic - post must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => {
        const postTagNames = post.tags.map(tag => tag.name.toUpperCase());
        return selectedTags.every(selectedTag =>
          postTagNames.includes(selectedTag),
        );
      });
    }

    return filtered;
  }, [searchQuery, selectedTags]);

  // Get featured post (first post)
  const featuredPost = posts[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <Background>
        <Section className="pb-12 pt-20">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <BookOpen className="size-12 text-blue-600 dark:text-blue-500" />
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-6xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                {t('section_title')}
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('section_description')}
            </p>
          </div>
        </Section>
      </Background>

      {/* Featured Post Section */}
      {featuredPost && (
        <Section className="pb-12 pt-8">
          <div className="mb-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              ⭐ Featured Article
            </h2>
            <div className="overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl transition-all hover:shadow-2xl dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
              <div className="p-8 md:p-12">
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map(tag => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <h3 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                  {featuredPost.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {featuredPost.content}
                </p>
                <div className="flex items-center justify-between border-t border-blue-200 pt-6 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                      {featuredPost.userId.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        @
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {featuredPost.userId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      💬
                    </p>
                    <p>
                      {' '}
                    </p>
                    <p>
                      {featuredPost.comments.length}
                    </p>
                    <p>
                      {' '}
                    </p>
                    <p>
                      comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Search and Filter Section */}
      <Section className="pb-8 pt-4">
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            � All Articles
          </h2>
          <SearchFilter
            onSearchChange={setSearchQuery}
            onTagsChange={setSelectedTags}
            selectedTags={selectedTags}
            availableTags={availableTags}
          />
          <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t('showing_results', { count: filteredPosts.length })}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0
          ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )
          : (
              // Empty State
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-16 text-center dark:border-gray-700 dark:bg-gray-900">
                <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                  <BookOpen className="size-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {t('no_results_title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('no_results_description')}
                </p>
              </div>
            )}
      </Section>
    </div>
  );
};
