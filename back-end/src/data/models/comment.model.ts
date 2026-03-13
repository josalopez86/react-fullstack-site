
import mongoose, { Types } from "mongoose";

export interface Comment {
  _id: Types.ObjectId;
  text: string;
  postedBy: boolean;
  postedByAt: Date;
}

export const CommentSchema = new mongoose.Schema({

    text: {
        type: String,
        required: [true, "comment text is required."],
    },
    postedBy:{
        type: String,
        required: [true, "posted by is required."],
    },
    userId:{
        type: String,
        required: [true, "user id is required."],
    },
    postedByAt:{
        type: Date,
        default: new Date        
        }
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
