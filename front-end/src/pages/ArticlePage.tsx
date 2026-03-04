import { useParams } from "react-router-dom";


export const ArticlePage = () => {

    const {name} = useParams();
    console.log({name});
    return(
        <h1>This is article page!! {name}</h1>
    );
}
