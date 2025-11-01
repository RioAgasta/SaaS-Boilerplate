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

export const SlashCommandMenu = ({ ref, ...props }) => {
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
    <div className="z-50 w-72 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div className="max-h-80 overflow-y-auto p-2">
        {props.items.length > 0
          ? (
              props.items.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  onClick={() => selectItem(index)}
                >
                  <div className="flex size-8 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700">
                    {item.icon}
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
              <div className="px-3 py-2 text-sm text-gray-500">No results</div>
            )}
      </div>
    </div>
  );
};

SlashCommandMenu.displayName = 'SlashCommandMenu';

export function getSlashCommandItems(): SlashCommandItem[] {
  return [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
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
      title: 'Heading 1',
      description: 'Big section heading.',
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
      title: 'Heading 2',
      description: 'Medium section heading.',
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
      title: 'Heading 3',
      description: 'Small section heading.',
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
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
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
      title: 'Numbered List',
      description: 'Create a list with numbering.',
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
      title: 'Quote',
      description: 'Capture a quote.',
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
      title: 'Code',
      description: 'Capture a code snippet.',
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
