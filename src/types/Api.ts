export type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Tag[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePostInput = {
  title: string;
  content: string;
  tags: string[];
};

export type UpdatePostInput = {
  title?: string;
  content?: string;
  tags?: string[];
};

export type CreateCommentInput = {
  content: string;
};
