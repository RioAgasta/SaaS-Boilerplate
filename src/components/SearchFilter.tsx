'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

type SearchFilterProps = {
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  selectedTags: string[];
  availableTags: string[];
};

export const SearchFilter = ({
  onSearchChange,
  onTagsChange,
  selectedTags,
  availableTags,
}: SearchFilterProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onSearchChange(value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const capitalizedTag = tagInput.trim().toUpperCase();

      if (!selectedTags.includes(capitalizedTag)) {
        onTagsChange([...selectedTags, capitalizedTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addPredefinedTag = (tag: string) => {
    const upperTag = tag.toUpperCase();
    if (!selectedTags.includes(upperTag)) {
      onTagsChange([...selectedTags, upperTag]);
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
      {/* Search Input */}
      <div className="relative">
        <label
          htmlFor="search-input"
          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          🔍 Search
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <Input
            id="search-input"
            type="text"
            placeholder="Find articles..."
            value={searchInput}
            onChange={e => handleSearchChange(e.target.value)}
            className="h-12 rounded-xl border-2 border-gray-300 pl-12 pr-4 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-600 dark:focus:ring-blue-900"
          />
        </div>
      </div>

      {/* Tag Input */}
      <div>
        <label
          htmlFor="tag-input"
          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          🏷️ Filter by Topic
        </label>
        <Input
          id="tag-input"
          type="text"
          placeholder="Add a topic (press Enter)"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          className="h-12 rounded-xl border-2 border-gray-300 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-600 dark:focus:ring-blue-900"
        />
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
              >
                <span>{tag}</span>
                <X className="size-4 transition-transform group-hover:rotate-90" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Select Tags */}
      {availableTags.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Popular Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const upperTag = tag.toUpperCase();
              const isSelected = selectedTags.includes(upperTag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => addPredefinedTag(tag)}
                  disabled={isSelected}
                  className="rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                >
                  {upperTag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
