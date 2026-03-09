import type { ArticleCommentInterface } from "./article.interface";

export interface ArticleLoaderData {
  content: string;
  name: string;
  upvotes: number;
  comments?: ArticleCommentInterface[];
}