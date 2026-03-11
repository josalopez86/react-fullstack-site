import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from 'fs';
import { MongoDatabase } from "./data/mongo-database";
import { ArticleRoutes } from "./presentation/article/article.routes";





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

  const firebaseCreds = JSON.parse(fs.readFileSync("./firebase-config.json", "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(firebaseCreds)
  });

  const app = express();

  app.use(express.json());

  app.use("/api/article", ArticleRoutes.routes);

  app.listen(8000,  ()=>{
      console.log("Server is listening on port 8000");
  });
}