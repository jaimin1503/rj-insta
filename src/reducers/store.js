import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import authReducer from "../reducers/authReducer.js"
export const store = configureStore ({
	reducer:{
		user:userReducer,
		auth:authReducer
	},
});

