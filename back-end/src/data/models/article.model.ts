
import mongoose, { Types } from "mongoose";
import { CommentSchema } from "./comment.model";

export interface Article {
  _id: Types.ObjectId;
  name: string;
  content: string;
  upvotes: number;
  comments: Comment[];
}

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "text is required."],
        unique: true,
    },
    content:{
        type: String,
    },
    upvotes:{
        type: Number,
        default: 0
    },
    comments:{
        type: [CommentSchema],
        default: []
    }
});

export const ArticleModel = mongoose.model("Article", ArticleSchema);
