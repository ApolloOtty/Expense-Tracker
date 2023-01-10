import React, { useEffect } from 'react';
import videobg from '../components/videowall.mp4';
import '../components/login.css';
import { useRef, useState, useContext} from 'react';
import AuthContext from './context/AuthProvider';
import axios from '../api/axios.js';


const Login = () => {
    const{setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [userID, setUserID] = useState(0);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        localStorage.setItem('userID', userID);
        localStorage.setItem('email', user);
        console.log(localStorage.getItem('userID'));
    },[userID])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url="http://localhost/deshboard-sidebar-main/src/api/verifyLogin.php";
            let fData=new FormData();
            fData.append('email', user);
            fData.append('pass', pwd);
            axios.post(url, fData)
            .catch(function (error) {
                if (error.response) {
                    console.log(error);
                  alert("Email or password don't match!")
            }
        }).then((response) => {
            if (response) {
                axios.post("http://localhost/deshboard-sidebar-main/src/api/getUserID.php", fData).then((response) => {
                    console.log(response.data.userID);
                    setUserID(parseInt(response.data.userID));
                    console.log(userID);
                    localStorage.setItem('userID', userID);
                    setSuccess(true);
                });
            
              console.log(response) // I show error here   
            }});
            }

    return (
        <>
            {success ? (
                <section>
                    <meta http-equiv="refresh" content="0; url=/dashboard" />
                </section>
            ) : (
        <div className='mainlog'>
            <div className='colorbg'>
            </div>
            <video src={videobg} autoPlay muted loop className='videobg'/>
            <p className='text'>Your Space To <br></br>Be Mindful.</p>
            <p className='text2'>Blast off today and start tracking your expenses.</p>
            <form className='login' onSubmit={handleSubmit}>
            <h1>Let's Prepare For<br></br>Launch!</h1>
            <input autocomplete="off" type="text" ref={userRef} placeholder="Enter Email" name="user" required className='inputemail' onChange={(e) => setUser(e.target.value)} value={user}></input>
            <input type="password" placeholder="Enter Password" name="pass" required className='inputemail'onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
            <button class="button-64" role="button"><span class="logintext">Login</span></button>
            <p>Don't have an account?<a href="/signup"> Sign up</a></p>
            </form>
        </div>
            )}
            </>
    );
};

export default Login;