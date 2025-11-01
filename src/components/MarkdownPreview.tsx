'use client';

import '../components/tiptap-styles.css';

type MarkdownPreviewProps = {
  content: string;
  className?: string;
};

export function MarkdownPreviewComponent({
  content,
  className,
}: MarkdownPreviewProps) {
  return (
    <div
      className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none ${className}`}
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
