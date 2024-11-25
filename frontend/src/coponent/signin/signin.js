import { useState,useRef } from "react"
import "./signin.css"
import { Link,useNavigate } from "react-router-dom"
import Header from "../header/header"
import axios from "axios"
import { useDispatch,useSelector } from "react-redux"
import { authetication } from "../slice/user-slice"
const SignIn = () => {
    const navigate=useNavigate()
    const ref=useRef()
    const [loginDetail, setLogInDetail] = useState({})
    const [err, setErr] = useState({})
    const state=useSelector(state=>state.userSlice.value)
    const dispatch=useDispatch()
    const handleLogInData = (e) => {
        setLogInDetail({ ...loginDetail, [e.target.id]: e.target.value })
    }

    const handleSignin = () => {
        if (!loginDetail.email || !loginDetail.password) {
            setErr({ ...err, fieldErr: "please fill all the fields" })
            setTimeout(() => {
                setErr({})
            }, 3000)
        } else {
            axios.post("http://localhost:5000/signin", loginDetail).then(data => {
                dispatch(authetication(data.data))
            }).catch(err => {
                setErr({ ...err, fieldErr: err.response.data })
                setTimeout(() => {
                    setErr({})
                }, 3000)
            })
        }
        state.token?
        navigate("/")
        :navigate("/signin")
    }
    return (
        <>
            <Header />
            <div className="signin-container">
                <div className="signin-header">
                    <h1><span style={{ color: "#1E88E5" }}>B</span >id<span style={{ color: "#1E88E5" }}>F</span>air</h1>
                    Login with your account
                </div>
                <hr></hr>
                {err.fieldErr ? <p style={{ textAlign: "center", color: "red" }}>{err.fieldErr}</p> : ""}
                <div className="signin-form-container">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your mail id" onChange={(e) => { handleLogInData(e) }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your mail id" onChange={(e) => { handleLogInData(e) }} />
                    </div>
                    <button onClick={handleSignin} ref={ref}>Sign In</button>
                    <div className="text">Don't have account? <Link to="/register"><span>Register</span></Link></div>
                </div>
            </div>
        </>
    )
}
export default SignIn