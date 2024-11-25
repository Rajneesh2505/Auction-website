import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "../slice/user-slice"
export default configureStore({
reducer:{
userSlice:UserSlice
}
})