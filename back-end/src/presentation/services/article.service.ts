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
                    comments: article.comments
                };
    }

    upvote = async (name:string): Promise<boolean> =>{
        const article = await ArticleModel.findOneAndUpdate(
            {name: name}, 
            {$inc: {upvotes: 1}}
        );

        if(!article)
        {
            return false;
        }

        //article!.upvotes += 1;
        article.save();

        return true;
    }

    addComment = async (name:string, text: string, postedBy: string): Promise<boolean> =>{
        const article = await ArticleModel.findOne({name: name});

        if(!article)
        {
            return false;
        }

        const comment: ArticleCommentInterface = {
            postedBy: postedBy,
            text: text,
            postedByAt: new Date()
        };

        article.comments.push(comment);
        article.save();

        return true;
    }
}