import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../../domain/useUser";



export const NavBar = () =>{
    const { isLoading, user } = useUser();
    let isLoggedIn = !!user;
    const navigate = useNavigate();

    const onHandleLogOut = async ()=>{
        console.log("clicked");
        await signOut(getAuth());
        isLoggedIn = false;
    }

    const onHandleSingIn = async ()=>{
        navigate("/login");
    }

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
                        { isLoading ? <li>Loading...</li>
                        : 
                        ( 
                            <>
                            {user && (<li><small>{user.email}</small></li>)}
                            <li>
                            { isLoggedIn ?
                                <button onClick={onHandleLogOut}>Log out</button>
                                : <button onClick={onHandleSingIn}>SingIn</button>
}
                            </li>
                            </>                            
                        )
                        }
                </ul>
            </nav>
        </>);
}