import { articlesContent } from "../../../ArticlesContent";
import { ArticleList } from "../components/ArticlesList";

export const ArticleListPage = () => {
    const articles = articlesContent;
    return(
        <>
            <h1>Articles</h1>
            <ArticleList  articles = {articles}/>
            
        </>
    );
}
