import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(''); //user 변수 생성, 상태 변환 함수 생성
    const [pwd, setPwd] = useState(''); //pwd 변수 생성, 상태 변환 함수 생성
    const [errMsg, setErrMsg] = useState(''); //에러 메세지 상태 변수 생성, 상태 변환 함수 생성
    const [success, setSuccess] = useState(false); // 성공 메세지 변수 생성, 상태 변환 함수 생성

    // 사용자의 입력값을 받아들이는 코드
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // 아이디, 비밀번호를 새로 입력받으면 에러 메세지 초가화
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
            setSuccess(true);
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
        <>
            {success ? ( // 로그인 성공시 보여지는 페이지(바로 home으로 가게 바꾸어야 될지도)
                <section>
                    <h1> You are logged in!</h1>
                    <br/>
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (

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
            )}
        </>
    )


}

export default Login