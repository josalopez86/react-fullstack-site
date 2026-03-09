import axios from "axios";
import { useState } from "react";
import { Navigate, useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import { CommentList } from "./components/commentList";
import type { ArticleLoaderData } from "../entities/article-loader-data.interface";
import { AddCommentForm } from "./components/AddCommentForm";

export const ArticlePage = () => {
    const {content, name, upvotes, comments } = useLoaderData() as ArticleLoaderData;
    const [upvotesInitial, setupvotesInitial] = useState(upvotes);
    const [commentsInitial, setCommentsInitial] = useState(comments ?? []);

    const onUpvoteClicked = async(name: string)=>{
        axios.post(`/api/article/${name}/upvote`)
        .then((response) => {
            setupvotesInitial(response.data);
        });
    }

    const handleAddComment = (postedBy: string, comment: string)=>{        
        
        axios.post(`/api/article/${name}/comments`,
            {
                text: comment,
                postedBy: postedBy
            })
        .then((response) => {
            console.log(response.data);
            setCommentsInitial(prev => [...prev, response.data]);
        });

    }

    if (!name) {
        return <Navigate to="/not-found" replace />;
    }

    return(
        <>
            <h2>{name}</h2>
            <button onClick={() => onUpvoteClicked(name)}>Upvote</button>
            <h3>This article has {upvotesInitial} votes!!</h3>
            <p>{content}</p>
            <AddCommentForm onAddComment={handleAddComment}></AddCommentForm>
            <CommentList comments={commentsInitial}></CommentList>
        </>
    )
}

export const articleLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await axios.get(`/api/article/${params.name}`);
    return await response.data;
}
