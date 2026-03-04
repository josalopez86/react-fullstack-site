import { Link } from "react-router-dom";


export const NavBar = () =>{
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/" key="home">home</Link>
                    </li>
                    <li>
                        <Link to="/about" key="about">About</Link>
                    </li>
                    <li>
                        <Link to="/articles" key="articles">Articles</Link>
                    </li>
                </ul>
            </nav>
        </>);

}