import { Router } from "express";
import { ArticleController } from "./article.controller";
import { ArticleService } from "../services/article.service";

export class ArticleRoutes {
    
  static get routes(): Router {

    const router = Router();
    const service = new ArticleService();
    const controller = new ArticleController(service);
    
    router.get('/', controller.getArticles);

    router.post('/', controller.addArticle);

    router.post('/:name/upvote', controller.upvote);

    router.post('/:name/comments', controller.addComment);

    return router;
  }


}

