import { ArticleModel } from "../../data/models/article.model";
import { ArticleCommentInterface, ArticleInterface } from "../../domain";

export class ArticleService{

     private articlesInfo: ArticleInterface[] = [];
    //     {
    //         name: "learn-node",
    //         content: "",
    //         upvotes: 0,
    //         comments: [],
    //     },
    //     {
    //         name: "learn-react",
    //         content: "",
    //         upvotes: 0,
    //         comments: [],
    //     },
    //     {
    //         name: "mongpdb",
    //         content: "",
    //         upvotes: 0,
    //         comments: []
    //     }];
    
    getArticles = ():ArticleInterface[] => {
        return this.articlesInfo;
    }

    addArticle = async (name:string, content: string): Promise<ArticleInterface> => {
        
        const article = await ArticleModel.insertOne({            
            name: name, 
            content: content,
            upvotes: 0            
        });
        
        return {
                id: article.id,
                content,
                name,
                upvotes: 0
            };
    }

    getArticleByName = (name:string): ArticleInterface| undefined => {
        
        const article = this.articlesInfo.find(f=>{return f.name === name});
        return article;
    }

    upvote = (name:string): boolean =>{
        const article = this.articlesInfo.find(f=>f.name === name);

        if(!article)
        {
            return false;
        }

        article!.upvotes += 1;

        return true;
    }

    addComment = (name:string, text: string, postedBy: string): boolean =>{
        const article = this.articlesInfo.find(f=>f.name === name);

        if(!article)
        {
            return false;
        }

        const comment: ArticleCommentInterface = {
            postedBy: postedBy,
            text: text
        };

        article!.comments!.unshift(comment);

        return true;
    }
}