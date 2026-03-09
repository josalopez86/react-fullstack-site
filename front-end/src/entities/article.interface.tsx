export interface ArticleInterface{
    name: string,
    title: string,
    content: string[]
}

export interface ArticleCommentInterface{
    text: string,
    postedBy: string,
    postedByAt: Date
}