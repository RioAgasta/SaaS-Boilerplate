'use client';

import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Text,
} from 'lucide-react';
import {
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export type SlashCommandItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (props: { editor: any; range: any }) => void;
};

export type SlashCommandMenuProps = {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
};

export const SlashCommandMenu = ({ ref, ...props }: { ref: any; items: SlashCommandItem[]; command: (item: SlashCommandItem) => void }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="z-50 w-72 overflow-hidden rounded-lg border-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-gray-800 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <div className="max-h-80 overflow-y-auto p-1">
        {props.items.length > 0
          ? (
              props.items.map((item: SlashCommandItem, index: number) => (
                <button
                  key={index}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all ${
                    index === selectedIndex
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => selectItem(index)}
                >
                  <div className="flex size-9 items-center justify-center rounded-md">
                    <div className="text-gray-600 dark:text-gray-400">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </button>
              ))
            )
          : (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No results</div>
            )}
      </div>
    </div>
  );
};

SlashCommandMenu.displayName = 'SlashCommandMenu';

export function getSlashCommandItems(t?: (key: string) => string): SlashCommandItem[] {
  // Fallback to English if no translation function provided
  const getText = t || ((key: string) => {
    const fallbacks: Record<string, string> = {
      slash_command_text_title: 'Text',
      slash_command_text_description: 'Just start typing with plain text.',
      slash_command_heading1_title: 'Heading 1',
      slash_command_heading1_description: 'Big section heading.',
      slash_command_heading2_title: 'Heading 2',
      slash_command_heading2_description: 'Medium section heading.',
      slash_command_heading3_title: 'Heading 3',
      slash_command_heading3_description: 'Small section heading.',
      slash_command_bullet_title: 'Bullet List',
      slash_command_bullet_description: 'Create a simple bullet list.',
      slash_command_numbered_title: 'Numbered List',
      slash_command_numbered_description: 'Create a list with numbering.',
      slash_command_quote_title: 'Quote',
      slash_command_quote_description: 'Capture a quote.',
      slash_command_code_title: 'Code',
      slash_command_code_description: 'Capture a code snippet.',
    };
    return fallbacks[key] || key;
  });

  return [
    {
      title: getText('slash_command_text_title'),
      description: getText('slash_command_text_description'),
      icon: <Text className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run();
      },
    },
    {
      title: getText('slash_command_heading1_title'),
      description: getText('slash_command_heading1_description'),
      icon: <Heading1 className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: getText('slash_command_heading2_title'),
      description: getText('slash_command_heading2_description'),
      icon: <Heading2 className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: getText('slash_command_heading3_title'),
      description: getText('slash_command_heading3_description'),
      icon: <Heading3 className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: getText('slash_command_bullet_title'),
      description: getText('slash_command_bullet_description'),
      icon: <List className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .toggleBulletList()
          .run();
      },
    },
    {
      title: getText('slash_command_numbered_title'),
      description: getText('slash_command_numbered_description'),
      icon: <ListOrdered className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .toggleOrderedList()
          .run();
      },
    },
    {
      title: getText('slash_command_quote_title'),
      description: getText('slash_command_quote_description'),
      icon: <Quote className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .toggleBlockquote()
          .run();
      },
    },
    {
      title: getText('slash_command_code_title'),
      description: getText('slash_command_code_description'),
      icon: <Code className="size-4" />,
      command: ({ editor: ed, range }) => {
        ed
          .chain()
          .focus()
          .deleteRange(range)
          .toggleCodeBlock()
          .run();
      },
    },
  ];
}
