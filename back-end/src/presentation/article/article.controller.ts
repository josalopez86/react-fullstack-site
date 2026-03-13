
import { Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";


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
        const {uid} = (req as any).user;

        const article = this.articleService.getArticleByName(name);        
        if(!article){
            return res.status(404).json("Article not found.");            
        }

        const upvotes = await this.articleService.upvote(name, uid);

        if(upvotes === 0)
        {
            return res.status(400).json("Couldn't upvote.");
        }
        res.json(upvotes);
    }

    addComment = async (req: Request, res: Response) => {
        const name: string = req.params.name as string;
        const {text, postedBy} = req.body;

        const {uid} = (req as any).user;
        console.log(uid);

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

        if(!uid){
            return res.status(404).json("userId is required.");            
        }

        const newComment = await this.articleService.addComment(name, text, postedBy, uid);

        if(!newComment)
        {
            return res.status(400).json("Article not found.");
        }
        return res.json(newComment);
    }

    deleteComment = async (req: Request, res: Response) => {

        const name: string = req.params.name as string;
        const id: string = req.params.id as string;
        const {uid} = (req as any).user;
        const article = await this.articleService.getArticleByName(name);

        if(!article)
        {
            return res.status(400).json("Article not found.");
        }

        const comment = article.comments?.find(f=>f.id === id);

        if(!comment){
            return res.status(400).json("Comment not found.");
        }

        if(comment.userId != uid){
            return res.status(400).json("Comment doesn't belong you");
        }

        if(!await this.articleService.deleteComment(name, id)){
            return res.status(400).json("Article not found.");
        }
        res.json(true);
    }

}