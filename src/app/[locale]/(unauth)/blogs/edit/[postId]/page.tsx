import type { Metadata } from 'next';

import { EditPostPage } from '@/templates/EditPostPage';

type EditPostProps = {
  params: Promise<{
    postId: string;
  }>;
};

export async function generateMetadata(props: EditPostProps): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Edit Post - ${params.postId}`,
  };
}

export default async function EditPost(props: EditPostProps) {
  const params = await props.params;
  return <EditPostPage postId={params.postId} />;
}
