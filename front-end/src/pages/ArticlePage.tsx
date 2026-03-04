import { Navigate, useParams } from "react-router-dom";
import { articlesContent } from "../ArticlesContent";


export const ArticlePage = () => {

    const {name} = useParams();
    const article = articlesContent.find(f=>f.name === name);

    if (!article) {
        return <Navigate to="/not-found" replace />;
    }

    return(
        <>
            <h2>{article?.title}</h2>
            {article?.content.map(p=> <p key={p}> {p} </p> )}
        </>
    )
}
