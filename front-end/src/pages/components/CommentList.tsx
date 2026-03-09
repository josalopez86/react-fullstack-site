
import type { ArticleCommentInterface } from "../../entities/article.interface";

interface ArticleCommentListProps {
    comments?: ArticleCommentInterface[];
}

export const CommentList = ({comments}: ArticleCommentListProps) => {
    return(
        <>
            <h3>Comments</h3>            
                { (comments && comments.length > 0) ?
                comments?.map((comment, index) => (
                    <div key={`div-comments${index}`} className="comments">
                    <h4 key={`posted${index}`}>Posted by: {comment.postedBy}</h4>
                    <h5 key={`postedAt${index}`}>At {new Date(comment.postedByAt).toLocaleString()}</h5>
                    <p key={`comment-text${index}`}>{comment.text}</p>
                    <hr  key={`hr${index}`}/>
                    </div>
                ))
                : <h3 key="no-comments">No comments!!</h3>}
        </>
    );
}