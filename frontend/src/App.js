import AddItem from "./coponent/addItem/addItem"
import Home from "./coponent/home/home"
import Auction from "./coponent/auction/auction"
import SignIn from "./coponent/signin/signin"
import Register from "./coponent/register/register"
import {BrowserRouter,Route,Routes} from "react-router-dom"

const App=()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/add-item" element={<AddItem/>}></Route>
      <Route path="/auction/:id" element={<Auction/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}
export default App
