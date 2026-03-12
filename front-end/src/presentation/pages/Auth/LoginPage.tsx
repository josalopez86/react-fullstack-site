import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';

export const LoginPage = () => {


    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onHandleClick = async ()=>{
        if(!emailText || !passwordText){
            alert("email and password are required.");
            return;
        }

        try{
            await signInWithEmailAndPassword(getAuth(), emailText, passwordText);
            navigate("/articles");
        

        }
        catch(e){
            if (e instanceof Error) {
                setError(e.message);
                return;
            }
            setError("Something happened.");
        }
        

    }


    return (
        <>
            <div>
                <h1>Log In</h1>
                {error && <p>{error}</p>}
                <input type="email"
                placeholder="Your email"
                value={emailText}
                onChange={ e => {setEmailText(e.target.value) }}/>
                <input type="password"
                placeholder="Your password"
                value={passwordText}
                onChange={ e => {setPasswordText(e.target.value) }}/>
                <button onClick={onHandleClick}>Log In</button>
                <br/>
                <Link to="/create-account">Create account</Link>
            </div>
        </>
    )
}
