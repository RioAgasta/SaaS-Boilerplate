import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const BlogNavbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li data-fade>
              <ThemeSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href="/sign-in">{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/dashboard">Profile</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
