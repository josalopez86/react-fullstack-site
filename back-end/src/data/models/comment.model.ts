
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
    },
    postedByAt:{
        type: Date,
        default: new Date        
        }
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
