import { useTranslations } from 'next-intl';

import { Background } from '@/components/Background';
import { Section } from '@/features/landing/Section';
import { CardList } from '@/templates/CardList';

export const BlogSection = () => {
  const t = useTranslations('Blog');

  const featuredArticles = [
    {
      id: '1',
      title: t('article1_title'),
      description: t('article1_description'),
      category: t('article1_category'),
      date: t('article1_date'),
      link: '/blog/getting-started',
    },
    {
      id: '2',
      title: t('article2_title'),
      description: t('article2_description'),
      category: t('article2_category'),
      date: t('article2_date'),
      link: '/blog/best-practices',
    },
    {
      id: '3',
      title: t('article3_title'),
      description: t('article3_description'),
      category: t('article3_category'),
      date: t('article3_date'),
      link: '/blog/performance',
    },
    {
      id: '4',
      title: t('article4_title'),
      description: t('article4_description'),
      category: t('article4_category'),
      date: t('article4_date'),
      link: '/blog/scaling',
    },
  ];

  return (
    <Background>
      <Section
        subtitle={t('section_subtitle')}
        title={t('section_title')}
        description={t('section_description')}
      >
        <CardList cards={featuredArticles} layout="vertical" />
      </Section>
    </Background>
  );
};
