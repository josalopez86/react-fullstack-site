export interface ArticleInterface{
    name: string,
    title: string,
    content: string[]
}

export interface ArticleCommentInterface{
    id: string,
    text: string,
    postedBy: string,
    postedByAt: Date
}