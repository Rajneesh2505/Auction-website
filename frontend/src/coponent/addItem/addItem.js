import "./addItem.css"
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import { useSelector } from "react-redux";
import axios from "axios"
const AddItem=()=>{
  const [fileName, setFileName] = useState({ItemName:"",category:"",startTime:"",endTime:"",startingPrice:"",description:"",img:""});
const [err,setErr]=useState("")
const state=useSelector(state=>state.userSlice.value)
const navigate=useNavigate()
  const handleFileChange = (event) => {
    if (event.target.type=="file") {
    const file = event.target.files[0];
    
      const reader = new FileReader();

      reader.onload = () => {
        setFileName({...fileName,img:reader.result});
      };

      reader.readAsDataURL(file);
    }else{
      setFileName({...fileName,[event.target.id]:event.target.value})
    }
  };
  const uploadAndCheck=()=>{
    if(!fileName.ItemName || !fileName.category || !fileName.startTime || !fileName.endTime || !fileName.startingPrice || !fileName.description || !fileName.img ){
setErr("please fill all the fields")
setTimeout(()=>{
  setErr("")
},5000)
    }else{
      if(state.data){
        axios.post("http://localhost:5000/auction",{...fileName,img:fileName.img,_id:state.data[0]._id}).then(data=>{
          if(data.statusText=="OK"){
    navigate("/")
          }
         }).catch(err=>{
         console.log(err)
         })
      }else{
navigate("/signin")
      }
    
      
    }
  }
return (
    <>
    <Header/>
    {err?<p>{err}</p>:""}
    <div className="form-container">
    
    <div className="upload-container">
      <label htmlFor="img" className="upload-label">
        {fileName.img?<img src={fileName.img} alt="preview" className="item-image"/>:<div><FaCloudUploadAlt className="upload-icon" />
        <span>Click to Upload</span></div>
}
      </label>
      <input
        type="file"
        id="img"
        className="file-input"
        onChange={(e)=>handleFileChange(e)} 
      />
    </div>
    <div className="input-field-container">
<div>
<label htmlFor="ItemName">
  Product Name
</label>
<input type="text" id="ItemName" placeholder="e.g (Modern Abstract Painting)" onChange={(e)=>handleFileChange(e)}/>
</div>
<div>
<label htmlFor="category">
  Category
</label>
<select id="category" onChange={(e)=>handleFileChange(e)}>
  <option value="">Select Category</option>
  <option value="Fashionable">Fashionable</option>
  <option value="Electronics">Electronics</option>
  <option value="Gadgets">Gadgets</option>
</select>
</div>
<div>
<label htmlfor="startTime">Start Time</label>
<input type="datetime-local" id="startTime" onChange={(e)=>handleFileChange(e)}/>
<label htmlfor="endTime">End Time</label>
  <input type="datetime-local" id="endTime" onChange={(e)=>handleFileChange(e)}/>
</div>
<div>
  <label htmlforr="startingPrice">Starting Price</label>
  <input type="text" id="startingPrice" onChange={(e)=>handleFileChange(e)}/>
</div>
<div>
  <label htmlfor="description">Description</label>
  <input type="text" id="description" onChange={(e)=>handleFileChange(e)}/>
</div>
<div>
<button onClick={uploadAndCheck}>Upload</button>
</div>

    </div>

    </div>
    </>
)
}
export default AddItem