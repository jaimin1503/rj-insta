import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./reducers/store.js";
import { Provider } from "react-redux";
import ChatProvider from "./context/chatProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <ChakraProvider>
      <BrowserRouter>
        <ChatProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  </GoogleOAuthProvider>
);
