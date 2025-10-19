import type { CardData } from '@/templates/CardList';

import { useTranslations } from 'next-intl';

import { CardList } from '@/templates/CardList';

export const CardDemo = () => {
  const t = useTranslations('CardDemo');

  // Sample cards data with translations
  const sampleCards: CardData[] = [
    {
      id: 1,
      title: t('card1_title'),
      description: t('card1_description'),
      category: t('card1_category'),
      date: t('card1_date'),
    },
    {
      id: 2,
      title: t('card2_title'),
      description: t('card2_description'),
      category: t('card2_category'),
      date: t('card2_date'),
    },
    {
      id: 3,
      title: t('card3_title'),
      description: t('card3_description'),
      category: t('card3_category'),
      date: t('card3_date'),
    },
    {
      id: 4,
      title: t('card4_title'),
      description: t('card4_description'),
      category: t('card4_category'),
      date: t('card4_date'),
    },
    {
      id: 5,
      title: t('card5_title'),
      description: t('card5_description'),
      category: t('card5_category'),
      date: t('card5_date'),
    },
    {
      id: 6,
      title: t('card6_title'),
      description: t('card6_description'),
      category: t('card6_category'),
      date: t('card6_date'),
    },
    {
      id: 7,
      title: t('card7_title'),
      description: t('card7_description'),
      category: t('card7_category'),
      date: t('card7_date'),
    },
    {
      id: 8,
      title: t('card8_title'),
      description: t('card8_description'),
      category: t('card8_category'),
      date: t('card8_date'),
    },
  ];

  const featuredCards = sampleCards.slice(0, 5);
  const latestCards = sampleCards.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Page Header */}
      <div className="bg-white py-12 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {t('page_title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('page_description')}
          </p>
        </div>
      </div>

      {/* Section 1: Horizontal Layout */}
      <CardList
        cards={featuredCards}
        layout="horizontal"
        title={t('section1_title')}
        description={t('section1_description')}
      />

      {/* Divider */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-300 dark:border-gray-700" />
        </div>
      </div>

      {/* Section 2: Vertical Layout */}
      <CardList
        cards={sampleCards}
        layout="vertical"
        title={t('section2_title')}
        description={t('section2_description')}
      />

      {/* Section 3: Latest Posts */}
      <CardList
        cards={latestCards}
        layout="vertical"
        title={t('section3_title')}
        description={t('section3_description')}
      />

      {/* Section 4: Browse More */}
      <CardList
        cards={sampleCards}
        layout="horizontal"
        title={t('section4_title')}
        description={t('section4_description')}
      />

      {/* Section 5: Empty State */}
      <CardList
        cards={[]}
        layout="vertical"
        title={t('section5_title')}
        description={t('section5_description')}
      />

      {/* Footer Info */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {t('info_title')}
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>{t('info_card_component')}</strong>
                {' '}
                <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">
                  src/components/Card.tsx
                </code>
              </p>
              <p>
                <strong>{t('info_cardlist_component')}</strong>
                {' '}
                <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">
                  src/templates/CardList.tsx
                </code>
              </p>
              <p className="mt-4">
                <strong>{t('info_layout_options')}</strong>
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>
                  <strong>horizontal</strong>
                  :
                  {' '}
                  {t('info_horizontal_desc')}
                </li>
                <li>
                  <strong>vertical</strong>
                  :
                  {' '}
                  {t('info_vertical_desc')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
