import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

export class ArticleMiddleware{

    public static validateUser = async(req: Request, res: Response, next: NextFunction) =>{

        const {authtoken }= req.headers;

        if(!authtoken){
            return res.status(401).json("Token is required.");
        }
        const user = await admin.auth().verifyIdToken(authtoken as string);
        if(!user)
        {
            return res.status(401).json("Token is invalid");
        }
        req.body.user = user;
        
        console.log(user);
        next();
    }
  
}
