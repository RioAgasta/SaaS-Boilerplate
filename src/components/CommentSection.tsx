'use client';

import type { CommentWithAuthor } from '@/utils/BlogHelpers';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type CommentItemProps = {
  comment: CommentWithAuthor;
  onEdit?: (commentId: string, newContent: string) => void;
  onDelete?: (commentId: string) => void;
  isEditable?: boolean;
};

export function CommentItem({ comment, onEdit, onDelete, isEditable = false }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleSave = () => {
    if (onEdit) {
      onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {comment.author.first_name[0]}
            {comment.author.last_name[0]}
          </div>
          <div>
            <p className="font-medium text-foreground">
              {comment.author.first_name}
              {' '}
              {comment.author.last_name}
            </p>
            <p className="text-xs text-muted-foreground">
              @
              {comment.author.username}
            </p>
          </div>
        </div>
        {isEditable && !isEditing && (
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete?.(comment.id)}
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3">
        {isEditing
          ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="edit-comment">Edit comment</Label>
                  <textarea
                    id="edit-comment"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} size="sm">
                    Save
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )
          : (
              <div className="prose prose-sm max-w-none text-foreground">
                {comment.content.split(/(\*\*.*?\*\*)/).map((part) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={part}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={part}>{part}</span>;
                })}
              </div>
            )}
      </div>
    </div>
  );
}

type CommentFormProps = {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
};

export function CommentForm({ onSubmit, isSubmitting = false }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="new-comment">Add a comment</Label>
        <textarea
          id="new-comment"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          rows={4}
          required
        />
      </div>
      <Button type="submit" disabled={!content.trim() || isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
}

type CommentsListProps = {
  comments: CommentWithAuthor[];
  onEdit?: (commentId: string, newContent: string) => void;
  onDelete?: (commentId: string) => void;
  currentUserId?: string;
};

export function CommentsList({ comments, onEdit, onDelete, currentUserId }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditable={currentUserId === comment.userId}
        />
      ))}
    </div>
  );
}
