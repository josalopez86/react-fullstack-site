
import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";


export class ArticleController{

    constructor(
        public readonly articleService: ArticleService
    ){}


    getArticles = async (req: Request, res: Response) => {
        const articles = await this.articleService.getArticles();
        res.json(articles);
    }

    getArticleByName = async (req: Request, res: Response) => {
        const name: string = req.params.name as string;

        const article = await this.articleService.getArticleByName(name);
        if(!article){
            return res.status(404).json("Article not found.");            
        }

        res.json(article);
    }

    addArticle = async (req: Request, res: Response) => {

        const {name} = req.body;
        const {content} = req.body;

        const article = await this.articleService.addArticle(name, content);
        res.json(article);
    }

    upvote = (req: Request, res: Response) => {
        const name: string = req.params.name as string;

        const article = this.articleService.getArticleByName(name);        
        if(!article){
            return res.status(404).json("Article not found.");            
        }

        if(!this.articleService.upvote(name))
        {
            return res.status(400).json("Article not found.");
        }
        res.json("Article upvoted succesfully.");
    }

    addComment = (req: Request, res: Response) => {
        const name: string = req.params.name as string;
        const {text, postedBy} = req.body;      

        const article = this.articleService.getArticleByName(name);        
        if(!article){
            return res.status(404).json("Article not found.");            
        }

        if(!text){
            return res.status(404).json("text is required.");            
        }

        if(!postedBy){
            return res.status(404).json("postedBy is required.");            
        }



        if(!this.articleService.addComment(name, text, postedBy))
        {
            return res.status(400).json("Article not found.");
        }
        return res.json("Article upvoted succesfully.");
    }

}