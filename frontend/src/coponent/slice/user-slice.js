import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:"userSlice",
    initialState:{
        value:{}
    },
    reducers:{
        authetication:(state,action)=>{
        state.value=action.payload
        }
    }
})

export const {authetication,endTime}=UserSlice.actions;
export default UserSlice.reducer