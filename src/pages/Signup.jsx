import React, { useEffect } from 'react';
import videobg from '../components/videowall.mp4';
import './login.css';
import { useRef, useState, useContext} from 'react';
import AuthContext from './context/AuthProvider';
import axios from '../api/axios.js';
import { unstable_isMuiElement } from '@mui/utils';

const LOGIN_URL = '/auth';

const Login = () => {
    const{setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdver, setPwdver] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        setErrMsg('');
    },[user,pwd])

    const handleSubmit = async (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user)){
        e.preventDefault()
            const url="http://localhost/deshboard-sidebar-main/src/api/insertregister.php";
            let fData=new FormData();
            fData.append('email', user);
            fData.append('pass', pwd);
            axios.post(url, fData)
            .catch(function (error) {
                if (error.response) {
                  alert("An account is already registered with this email!")
            }
        }).then((response) => {
            if (response) {
              console.log(response) // I show error here   
              setSuccess(true)         
            }});
        }else alert("Email not valid!")
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
            <input autocomplete="off" type="text" ref={userRef} placeholder="Enter Email" name="uname" id="uname" required className='inputemail' onChange={(e) => setUser(e.target.value)} value={user}></input>
            <input type="password" placeholder="Enter Password" name="pass" required className='inputemail'onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
            <input type="password" placeholder="Verify Password" name="passver" required className='inputemail'onChange={(e) => setPwdver(e.target.value)} value={pwdver}></input>
            <button class="button-64" role="button"><span class="logintext">Sign up</span></button>
            <p>Already have an account?<a href="/"> Login</a></p>
            </form>
        </div>
            )}
            </>
    );
};

export default Login;