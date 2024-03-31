import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import authReducer from "./authReducer.js"
import postReducer from "./postReducer.js";
export const store = configureStore ({
	reducer:{
		user:userReducer,
		auth:authReducer,
		post:postReducer
	},
});

