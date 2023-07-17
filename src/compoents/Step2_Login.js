import { useRef, useState, useEffect } from "react";
//add
import useAuth from "../hooks/Step2_useAuth";
import {Link, useNavigate, useLocation } from "react-router-dom"

import axios from "../api/axios";
const LOGIN_URL = '/auth'

const Login = () => {
    //add 
    const { setAuth } = useAuth();

    //add 다른 페이지를 눌렀는데 로그인이 안되어서 다시 로그인 페이지로 돌아온 후 
    // 로그인을 하면 처음 들어갔던 페이지로 다시 돌아가서 들어가게 하는 기능?
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(''); //user 변수 생성, 상태 변환 함수 생성
    const [pwd, setPwd] = useState(''); //pwd 변수 생성, 상태 변환 함수 생성
    const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
    
    //add
    // const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성

    // 사용자의 입력값을 받아들이는 코드
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // 잘못된 아이디, 비밀번호를 입력받아 놓고 에러 메세지 반환
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers : { 'Content-Type' : 'application/json'},
                    withCredentials : true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken});
            setUser('');
            setPwd('');

            // add
            // setSuccess(true);
            navigate(from, {replace: true });

        } catch (err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Usernamer or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        
    }

    return (

        //add
        // <>
        //     {success ? ( // 로그인 성공시 보여지는 페이지(바로 home으로 가게 바꾸어야 될지도)
        //         <section>
        //             <h1> You are logged in!</h1>
        //             <br/>
        //             <p>
        //                 <a href="#">Go to Home</a>
        //             </p>
        //         </section>
        //     ) : (

            <section>
                {/* aria-live : 웹 접근성 변환 알림(off, polite, assertive)
                assertive는 중요 변경사항이 있을 때 즉시 알림
                className은 errMsg = true 면 errMsg로 아니면 offscreen으로 변환됨 */}
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign in</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        ref={userRef} 
                        autoComplete="off" 
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        autoComplete="off" 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign in</button>
                    <p>
                        register Account<br/>
                        <span className="line">
                            {/* router link here */}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </form>
            </section>
        //add
        //     )}
        // </>
    )


}

export default Login