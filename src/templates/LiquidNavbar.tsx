'use client';

import LiquidGlass from 'liquid-glass-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { Logo } from './Logo';

export const LiquidNavbar = () => {
  const t = useTranslations('Navbar');

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <LiquidGlass
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        aberrationIntensity={2}
        elasticity={0.35}
        cornerRadius={20}
        padding="12px 24px"
        className="backdrop-blur-md bg-background/80 border border-border/50"
      >
        <nav className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Logo />
            <ul className="hidden md:flex items-center gap-6">
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('product')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('docs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('community')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('company')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Link
              href="/sign-in"
              className="hidden sm:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {t('sign_in')}
            </Link>
            <Link className={buttonVariants({ size: 'sm' })} href="/sign-up">
              {t('sign_up')}
            </Link>
          </div>
        </nav>
      </LiquidGlass>
    </div>
  );
};
