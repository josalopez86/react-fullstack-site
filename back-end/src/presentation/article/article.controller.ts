
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

    upvote = async (req: Request, res: Response) => {
        const name: string = req.params.name as string;
        const {uid} = req.body.user;

        const article = this.articleService.getArticleByName(name);        
        if(!article){
            return res.status(404).json("Article not found.");            
        }

        const upvotes = await this.articleService.upvote(name, uid);

        if(upvotes === 0)
        {
            return res.status(400).json("Article not found.");
        }
        res.json(upvotes);
    }

    addComment = async (req: Request, res: Response) => {
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

        const newComment = await this.articleService.addComment(name, text, postedBy);

        if(!newComment)
        {
            return res.status(400).json("Article not found.");
        }
        return res.json(newComment);
    }

    deleteComment = async (req: Request, res: Response) => {

        const name: string = req.params.name as string;
        const id: string = req.params.id as string;

        if(!await this.articleService.deleteComment(name, id)){
            return res.status(400).json("Article not found.");
        }
        res.json(true);
    }

}