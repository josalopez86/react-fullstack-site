
export interface ArticleInterface{
    id: string,
    name: string,
    content: string,
    upvotes: number,
    comments?: ArticleCommentInterface[]
}

export interface ArticleCommentInterface{
    text: string,
    postedBy: string,
}