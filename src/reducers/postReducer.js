import { createSlice } from "@reduxjs/toolkit";

const initialState=[]
const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        setpost(state,action){
            state.push(action.payload)
        }
    }
})
export const {setpost}=postSlice.actions
export default postSlice.reducer