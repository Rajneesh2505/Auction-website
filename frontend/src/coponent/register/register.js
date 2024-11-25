import { useState } from "react"
import Header from "../header/header"
import { Link,useNavigate } from "react-router-dom"
import "./register.css"
import axios from "axios"

const Register=()=>{
    const navigate=useNavigate()
    const [err,setErr]=useState("")
    const [newUser,setNewUser]=useState({})
    const handlenewUser=(e)=>{
        if (e.target.type=="file") {
            const file = e.target.files[0];
            
              const reader = new FileReader();
        
              reader.onload = () => {
                setNewUser({...newUser,
                    profilePicture:reader.result});
              };
        
              reader.readAsDataURL(file);
            }else{
              setNewUser({...newUser,[e.target.id]:e.target.value})
            }
    }
    const handleRegistre=()=>{
        if(!newUser.fullName || !newUser.email || !newUser.password || !newUser.phone){
setErr("Please fill all the field")
setTimeout(()=>{
setErr("")
},3000)
        }
        else{
            axios.post("http://localhost:5000/signup",newUser).then(data=>{
                if(data.statusText){
navigate("/signin")
                }
            }).catch(err=>{
                setErr("use different email")
setTimeout(()=>{
setErr("")
},3000)

            })

        }
    }

return (
    <>
    <Header/>
    <div className="registration-container">
    <div className="register-header">
                    <h1><span style={{ color: "#1E88E5" }}>B</span >id<span style={{ color: "#1E88E5" }}>F</span>air</h1>
                    Register as new user
                </div>
                <hr></hr>
                <div className="register-form">
                    {err?<p style={{color:"red",textAlign:"center"}}>{err}</p>:""}
<div>
    <label htmlFor="fullName">Full Name</label>
    <input type="text" id="fullName" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="email">Email</label>
    <input type="email" id="email" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="password">Password</label>
    <input type="text" id="password" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="profilePicture">Select Profile Picture</label>
    <input type="file" id="profilePicture" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="phone"> Contact Number</label>
    <input type="text" id="phone" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="city">City</label>
    <input type="text" id="city" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <label htmlFor="gender">Gender</label>
    <input type="text" id="gender" placeholder="Enter your full name" onChange={(e)=>{handlenewUser(e)}}/>
</div>
<div>
    <button onClick={handleRegistre}>Register</button>
    <div className="registration-text">Already have account. <Link to="/signin"><span style={{textDecoration:"none"}}>SignIn</span></Link></div>
</div>
                </div>
    </div>
    </>
)
}
export default Register