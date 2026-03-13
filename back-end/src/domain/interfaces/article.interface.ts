
export interface ArticleInterface{
    id: string,
    name: string,
    content?: string,
    upvotes: number,
    comments?: ArticleCommentInterface[]
}

export interface ArticleCommentInterface{
    id: string,
    text: string,
    postedBy: string,
    userId: string,
    postedByAt: Date
}