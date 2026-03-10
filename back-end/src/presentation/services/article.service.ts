import { ArticleModel } from "../../data/models/article.model";
import { ArticleCommentInterface, ArticleInterface } from "../../domain";

export class ArticleService{
    
    getArticles = async ():Promise< ArticleInterface[] | undefined> => {
        const articles = await ArticleModel.find();

        const ArticlesEntity = articles.map((article): ArticleInterface => {
            return{
                 id: article.id,
                 name: article.name,
                 content: article.content ?? "",
                 upvotes: article.upvotes,
                 comments: article.comments.map((comment): ArticleCommentInterface => {
                                                return {
                                                    text: comment.text,
                                                    postedBy: comment.postedBy,
                                                    postedByAt: comment.postedByAt,
                                                    id: comment._id.toString()

                                                }})
            }
        });

        return ArticlesEntity;
    }

    addArticle = async (name:string, content: string): Promise<ArticleInterface> => {
        
        const article = await ArticleModel.insertOne({            
            name: name, 
            content: content,
            upvotes: 0            
        });

        article.save();
        
        return {
                id: article.id,
                content,
                name,
                upvotes: 0
            };
    }

    getArticleByName = async (name:string): Promise<ArticleInterface | undefined> => {
        
        const article = await ArticleModel.findOne({name: name});
        if(!article){
            return undefined;
        }

        return {
                    id: article.id,
                    name: article.name,
                    content: article.content ?? "",
                    upvotes: article.upvotes,
                    comments: article.comments.map(comment=>{
                        return{
                            id: comment._id.toString(),
                            text: comment.text,
                            postedBy: comment.postedBy,
                            postedByAt: comment.postedByAt
                        }
                    })
                };
    }

    upvote = async (name:string): Promise<number> =>{
        const article = await ArticleModel.findOneAndUpdate(
            {name: name}, 
            {$inc: {upvotes: 1}}
        );

        if(!article)
        {
            return 0;
        }
        article.save();

        return article.upvotes+1;
    }

    addComment = async (name:string, text: string, postedBy: string): Promise<ArticleCommentInterface | null> =>{
        const article = await ArticleModel.findOne({name: name});

        if(!article)
        {
            return null;
        }

        const comment = {
            postedBy: postedBy,
            text: text,
            postedByAt: new Date(),

        };

        article.comments.push(comment);
        article.save();

        return {
            ...comment, 
        id: article.id};
    }

    deleteComment = async (name:string, id: string): Promise<boolean> =>{
        const comment = await ArticleModel.updateOne(
            {name: name}, 
            {$pull: {comments:{_id: id}}}
        );

        if(!comment)
        {
            return false;
        }

        return true;
    }
}