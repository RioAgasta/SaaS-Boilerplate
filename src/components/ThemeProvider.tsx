'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import * as React from 'react';

function ThemeSync() {
  const { theme } = useTheme();

  React.useEffect(() => {
    const html = document.documentElement;
    const darkThemes = new Set([
      'dark',
      'catppuccin-frappe',
      'catppuccin-macchiato',
      'catppuccin-mocha',
    ]);

    if (theme) {
      if (darkThemes.has(theme)) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, [theme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
