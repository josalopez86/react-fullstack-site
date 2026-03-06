import express from "express";
import { ArticleRoutes } from "./presentation/article/article.routes";
import { MongoDatabase } from "./data/mongo-database";
import dotenv from "dotenv";



(async()=> {
  main();
})();

async function main() {
  dotenv.config();
  await MongoDatabase.connect(
  {
    dbName: process.env.MONGO_DB_NAME ?? "",
    mongoUrl: process.env.MONGO_URL ?? ""
  });

  const app = express();

  app.use(express.json());

  app.use("/api/article", ArticleRoutes.routes);

  app.listen(8000,  ()=>{
      console.log("Server is listening on port 8000");
  });
}