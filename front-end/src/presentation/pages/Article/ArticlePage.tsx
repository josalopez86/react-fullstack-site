import axios from "axios";
import { useState } from "react";
import { Navigate, useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import { AddCommentForm } from "../components/AddCommentForm";
import { CommentList } from "../components/CommentList";
import type { ArticleLoaderData } from "../../../domain/entities/article-loader-data.interface";
import { useUser } from "../../../domain/useUser";


export const ArticlePage = () => {    
    const {content, name, upvotes, comments } = useLoaderData() as ArticleLoaderData;
    const [upvotesInitial, setupvotesInitial] = useState(upvotes);
    const [commentsInitial, setCommentsInitial] = useState(comments ?? []);
    console.log(comments);
    const { user } = useUser();

    const getHeaders = async() =>{
        const token = user && await user.getIdToken();
        return token ? {authtoken: token} : {};

    }

    const onUpvoteClicked = async(name: string)=>{
        const headers = await getHeaders();
        
        axios.post(`/api/article/${name}/upvote`, null, {headers: headers})
        .then((response) => {
            console.log({response});
            setupvotesInitial(response.data);
            alert("Upvoted!!.");
        }).catch((error) =>{
            alert(error.response.data);
        });
    }

    const handleAddComment = async(postedBy: string, comment: string)=>{
        const headers = await getHeaders();

        axios.post(`/api/article/${name}/comments`,
            {
                text: comment,
                postedBy: postedBy
            }, {headers: headers})
        .then((response) => {
            setCommentsInitial(prev => [...prev, response.data]);
            alert("Comment added!!");
        });
    }

    const handleDeleteComment = async (id: string)=>{        
        const headers = await getHeaders();
        axios.delete(`/api/article/${name}/comments/${id}`, {headers: headers})
        .then((response) => {
            if(response.data)
            {
                const newComments = commentsInitial.filter(comment => comment.id !== id);
                setCommentsInitial(newComments);
                alert("Comment deleted!!");
            }
        }).catch((error)=>{
            alert(error.response.data);
        });
    }

    if (!name) {
        return <Navigate to="/not-found" replace />;
    }

    return(
        <>
            <h2>{name}</h2>
            {user && <button onClick={() => onUpvoteClicked(name)}>Upvote</button>}
            <h3>This article has {upvotesInitial} votes!!</h3>
            <p>{content}</p>
            {user ? <AddCommentForm onAddComment={handleAddComment}></AddCommentForm>
            : 
            <p>Log in to add comments</p>
            }
            <CommentList comments={commentsInitial} onDeleteComment={handleDeleteComment}></CommentList>
        </>
    )
}

export const articleLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await axios.get(`/api/article/${params.name}`);
    return await response.data;
}
