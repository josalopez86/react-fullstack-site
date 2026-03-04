import { Link } from "react-router-dom";


export const NavBar = () =>{
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/" id="home">home</Link>
                    </li>
                    <li>
                        <Link to="/about" id="about">About</Link>
                    </li>
                    <li>
                        <Link to="/articles" id="articles">Articles</Link>
                    </li>
                </ul>
            </nav>
        </>);

}