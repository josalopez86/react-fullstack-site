import { useState } from "react";

export interface addComentParams{
  onAddComment: (name: string, comment: string)=> void;
}

export const AddCommentForm = ({onAddComment}: addComentParams) => {
  const [nameText, setNameText] = useState("");
  const [commentText, setCommentText] = useState("");

  return (
    <div>
      <h3>Add Comment</h3>
      <label>
        Name: <input type="text" value={nameText} onChange={e=>{setNameText(e.target.value)}}/>
      </label>
      <label>
        Comment: <input type="text" value={commentText} onChange={e=>{setCommentText(e.target.value)}}/>
      </label>
    <button onClick={ () => {onAddComment(nameText, commentText)}}>Send</button>
    </div>
  )
}
