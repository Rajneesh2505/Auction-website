import { useNavigate,Link } from "react-router-dom"
import { useSelector } from "react-redux"
const Header=()=>{
    const navigate=useNavigate()
    const state=useSelector(state=>state.userSlice.value)
return (
    <>
     <header>
        <nav className="nav-bar-list">
            <h1><span style={{color:"#1E88E5"}}>B</span >id<span style={{color:"#1E88E5"}}>F</span>air</h1>
            <ul type="none">
                <Link to="/"><li>Home</li></Link>
                <li>Contact</li>
                <li>About us</li>
            </ul>
            {state.token?<img src={state.data[0].profilePicture}alt="user-image" height="50px" width="55px" style={{borderRadius:"100px"}} />:
            <button onClick={()=>{navigate("/signin")}}>Sign in</button>
}
        </nav>
        </header>
        <hr></hr>
    </>
)
}
export default Header