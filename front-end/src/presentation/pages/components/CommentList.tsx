import type { ArticleCommentInterface } from "../../../domain/entities/article.interface";
import { useUser } from "../../../domain/useUser";


interface ArticleCommentListProps {
    comments?: ArticleCommentInterface[],
    onDeleteComment: (id: string) => void;
}

export const CommentList = ({comments, onDeleteComment}: ArticleCommentListProps) => {

    const { user } = useUser();

    return(
        <>
            <h3>Comments</h3>            
                { (comments && comments.length > 0) ?
                comments?.map((comment, index) => (
                    <div key={`div-comments${index}`} className="comments">
                        <h4 key={`posted${index}`}>
                            Posted by: <strong>{comment.postedBy}</strong>
                            <small key={`postedAt${index}`}>&emsp;&emsp;at {new Date(comment.postedByAt).toLocaleString()}</small>

                        </h4>
                        
                        <p key={`comment-text${index}`}>{comment.text}</p>
                        <hr  key={`hr${index}`}/>
                        { (user && user.uid == comment.userId) && (<div key={`div${index}`} className="button-div">
                            <button onClick={ () => {onDeleteComment(comment.id)}}>Remove</button>
                        </div>)}
                    </div>                    
                ))
                : <h3 key="no-comments">No comments!!</h3>}
        </>
    );
}