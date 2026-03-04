import { Link } from "react-router-dom";
import type { ArticleInterface } from "../../entities/article.interface";

interface ArticleListProps {
    articles: ArticleInterface[];
}

export const ArticleList = ({articles}: ArticleListProps) => {
    return(
        <>
            {articles.map(article => (            
                <Link to={"/article/"+article.name} key={"link-"+article.name}>
                    <h3 key={"h3-"+article.name}>{article.title}</h3>
                </Link>
            ))}
        </>
    );
}