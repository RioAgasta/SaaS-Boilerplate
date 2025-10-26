import { getTranslations } from 'next-intl/server';

import { FYPPostsPage } from '@/templates/FYPPostsPage';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'FYPPosts',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function BlogsPage() {
  return <FYPPostsPage />;
}
