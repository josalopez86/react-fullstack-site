import { Router } from "express";
import { ArticleController } from "./article.controller.js";
import { ArticleService } from "../services/article.service.js";
import { ArticleMiddleware } from "../../domain/middleware/article-middleware.js";

export class ArticleRoutes {
    
  static get routes(): Router {

    const router = Router();
    const service = new ArticleService();
    const controller = new ArticleController(service);
    
    router.get('/', controller.getArticles);
    router.get('/:name', controller.getArticleByName);

    //router.use(ArticleMiddleware.validateUser);

    router.post('/', controller.addArticle);

    router.post('/:name/upvote', controller.upvote);

    router.post('/:name/comments', controller.addComment);
    router.delete('/:name/comments/:id', controller.deleteComment);

    return router;
  }


}

