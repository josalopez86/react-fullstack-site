import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

export const CreateAccountPage = () => {


    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onHandleClick = async ()=>{
        if(!emailText || !passwordText){
            alert("email and password are required.");
            return;
        }

        if(confirmPasswordText !== passwordText){
            alert("passwords must are the same.");
            return;
        }

        try{
            const response = await createUserWithEmailAndPassword(getAuth(), emailText, passwordText);
            console.log(response);
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
                <h1>Create account</h1>
                {error && <p>{error}</p>}
                <input type="email"
                placeholder="Your email"
                value={emailText}
                onChange={ e => {setEmailText(e.target.value) }}/>
                <input type="password"
                placeholder="Your password"
                value={passwordText}
                onChange={ e => {setPasswordText(e.target.value) }}/>
                <input type="password"
                placeholder="Confirm password"
                value={confirmPasswordText}
                onChange={ e => {setConfirmPasswordText(e.target.value) }}/>
                <button onClick={onHandleClick}>Create account</button>
                <br/>
                <Link to="/login">Log In</Link>
            </div>
        </>
    )
}



// npm install -g firebase-tools