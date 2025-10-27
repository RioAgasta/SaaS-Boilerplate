'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { DeletePostDialog } from '@/components/DeletePostDialog';
import { PostCard } from '@/components/PostCard';
import { PostFormDialog } from '@/components/PostFormDialog';
import { SearchFilter } from '@/components/SearchFilter';
import { Button } from '@/components/ui/button';
import { tags as allTags, posts as dummyPosts } from '@/data/dummy';
import { Section } from '@/features/landing/Section';
import { BlogNavbar } from '@/templates/BlogNavbar';

type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Array<{ id: number; name: string }>;
  comments: any[];
};

export const FYPPostsPage = () => {
  const t = useTranslations('FYPPosts');
  // const { toast } = useToast();

  // Mock current user
  const currentUserId = 'john_doe';

  // State for posts
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // State for search and filter
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
  }, [posts, searchQuery, selectedTags]);

  // Get top 3 recommended posts (most comments)
  const recommendedPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 3),
    [posts],
  );

  // Handlers
  const handleCreatePost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    toast('Your post has been created successfully.');
  };

  const handleEditPost = (updatedPost: Post) => {
    setPosts(prev =>
      prev.map(post => (post.id === updatedPost.id ? updatedPost : post)),
    );
    toast('Your post has been updated successfully.');
  };

  const handleDeletePost = () => {
    if (selectedPost) {
      setPosts(prev => prev.filter(post => post.id !== selectedPost.id));
      toast('Your post has been deleted successfully.');
      setIsDeleteDialogOpen(false);
      setSelectedPost(null);
    }
  };

  const openEditDialog = (post: Post) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setIsDeleteDialogOpen(true);
    }
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Simple Header */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <Section className="py-8">
            <h1 className="mb-2 text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
              {t('section_title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('section_description')}
            </p>
          </Section>
        </div>

        {/* Main Content */}
        <Section className="py-12">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Sidebar - Search & Filter */}
            <aside className="lg:col-span-3">
              <div className="sticky top-8">
                <SearchFilter
                  onSearchChange={setSearchQuery}
                  onTagsChange={setSelectedTags}
                  selectedTags={selectedTags}
                  availableTags={availableTags}
                />
              </div>
            </aside>

            {/* Main Feed */}
            <main className="lg:col-span-6">
              {/* Create Post Button */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('showing_results', { count: filteredPosts.length })}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 size-4" />
                  Create Post
                </Button>
              </div>

              {/* Posts List */}
              {filteredPosts.length > 0
                ? (
                    <div className="space-y-8">
                      {filteredPosts.map(post => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onEdit={openEditDialog}
                          onDelete={openDeleteDialog}
                          currentUserId={currentUserId}
                        />
                      ))}
                    </div>
                  )
                : (
                    // Empty State
                    <div className="py-16 text-center">
                      <p className="text-lg text-gray-500 dark:text-gray-400">
                        {t('no_results_title')}
                      </p>
                      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                        {t('no_results_description')}
                      </p>
                    </div>
                  )}
            </main>

            {/* Right Sidebar - Recommended Posts */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-8">
                <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                  Staff Picks
                </h3>
                <div className="space-y-4">
                  {recommendedPosts.map(post => (
                    <Link key={post.id} href={`/blogs/${post.id}`}>
                      <article className="group cursor-pointer">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
                            {post.userId.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">
                            @
                            {post.userId}
                          </span>
                        </div>
                        <h4 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-400">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {post.comments.length}
                            {' '}
                            comments
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Section>
      </div>

      {/* Dialogs */}
      <PostFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleCreatePost}
        mode="create"
      />

      <PostFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        post={selectedPost || undefined}
        onSave={handleEditPost}
        mode="edit"
      />

      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeletePost}
        postTitle={selectedPost?.title || ''}
      />
    </>
  );
};
