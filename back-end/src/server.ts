import express, { Request, Response } from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from 'fs';
import path from "path";
import {fileURLToPath} from 'url';
import { MongoDatabase } from "./data/mongo-database.js";
import { ArticleRoutes } from "./presentation/article/article.routes.js";

(async()=> {
  main();
})();

async function main() {
  dotenv.config();
  const port = process.env.PORT ?? 8000;
  await MongoDatabase.connect(
  {
    dbName: process.env.MONGO_DB_NAME ?? "",
    mongoUrl: process.env.MONGO_URL ?? ""
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = path.join(__dirname, "data.json");

  const firebaseCreds = JSON.parse(fs.readFileSync("./firebase-config.json", "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(firebaseCreds)
  });


  const app = express();

  app.use(express.json());

  app.use(express.static(path.join(__dirname, "../dist")));

  app.get(/^(?!\/api).+/, (req: Request, res: Response)=>{
    return res.sendFile(path.join(__dirname, "../dist/index.html"));
  })

  app.use("/api/article", ArticleRoutes.routes);

  app.listen(port,  ()=>{
      console.log(`Server is listening on port ${port}`);
  });
}