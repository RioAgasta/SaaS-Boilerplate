'use client';

import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MarkdownEditor } from '@/components/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tags as allTags } from '@/data/dummy';
import { BlogNavbar } from '@/templates/BlogNavbar';

type Tag = {
  id: number;
  name: string;
};

export const WritePostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string; tags?: string }>({});
  const [isPublishing, setIsPublishing] = useState(false);

  const validate = () => {
    const newErrors: { title?: string; content?: string; tags?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 50000) {
      newErrors.content = 'Content must be 50,000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) {
      return;
    }

    setIsPublishing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Save post to backend
    // console.log('Publishing:', { title, content, tags: selectedTags });

    // Redirect to blog list
    router.push('/blogs');
  };

  const togglePredefinedTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find(t => t.id === tag.id);
      if (exists) {
        return prev.filter(t => t.id !== tag.id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, tag];
    });
  };

  const addCustomTag = () => {
    const tagName = customTagInput.trim().toUpperCase();

    if (!tagName) {
      return;
    }

    if (selectedTags.length >= 5) {
      setErrors(prev => ({ ...prev, tags: 'Maximum 5 tags allowed' }));
      return;
    }

    // Check if tag already exists
    if (selectedTags.some(t => t.name === tagName)) {
      setCustomTagInput('');
      return;
    }

    // Add custom tag with negative ID to distinguish from predefined
    const newTag: Tag = {
      id: -(Date.now()), // Negative ID for custom tags
      name: tagName,
    };

    setSelectedTags(prev => [...prev, newTag]);
    setCustomTagInput('');
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const removeTag = (tagId: number) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tagId));
    setErrors(prev => ({ ...prev, tags: undefined }));
  };

  const handleCustomTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTag();
    }
  };

  return (
    <>
      <BlogNavbar />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Medium-style Header */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                ← Back
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                disabled={isPublishing}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !title.trim() || !content.trim()}
                className="bg-green-600 px-6 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>

        {/* Medium-style Editor Container */}
        <div className="mx-auto max-w-3xl px-6 py-12">
          {/* Title Input - Medium Style */}
          <div className="mb-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              className="h-[60px] border-none bg-transparent px-0 text-[42px] font-medium leading-[1.14] tracking-tight text-gray-800 placeholder:text-gray-300 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
              style={{
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Content Editor - Medium Style */}
          <div className="mb-12">
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Tell your story..."
              height={600}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* Tags Section */}
          <div className="space-y-6 border-t border-gray-200 pt-10 dark:border-gray-800">
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selected Topics (
                  {selectedTags.length}
                  /5)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => removeTag(tag.id)}
                        className="transition-opacity hover:opacity-70"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Tag Input */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Add Custom Topic
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Type and press Enter (e.g., database → DATABASE)"
                  value={customTagInput}
                  onChange={e => setCustomTagInput(e.target.value)}
                  onKeyPress={handleCustomTagKeyPress}
                  disabled={selectedTags.length >= 5}
                  className="flex-1"
                  maxLength={20}
                />
                <Button
                  type="button"
                  onClick={addCustomTag}
                  disabled={!customTagInput.trim() || selectedTags.length >= 5}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.tags && (
                <p className="mt-2 text-sm text-red-500">{errors.tags}</p>
              )}
            </div>

            {/* Predefined Tags */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Or Select from Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.some(t => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => togglePredefinedTag(tag)}
                      disabled={!isSelected && selectedTags.length >= 5}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
