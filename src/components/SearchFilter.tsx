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
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <label
          htmlFor="search-input"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="search-input"
            type="text"
            placeholder="Find articles..."
            value={searchInput}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tag Input */}
      <div>
        <label
          htmlFor="tag-input"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Filter by Topic
        </label>
        <Input
          id="tag-input"
          type="text"
          placeholder="Add topic..."
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
        />
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="group flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <span>{tag}</span>
                <X className="size-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Select Tags */}
      {availableTags.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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
                  className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
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
