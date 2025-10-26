// Type definitions for Blog Post system

export type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: Tag[];
  comments: Comment[];
};

export type Posts = {
  data: Post[];
};

export type HTTPSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type HTTPFailed = {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
};
