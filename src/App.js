import "./App.css";

import React from "react";
import MainRoute from "./Helper/MainRoute/MainRoute";
import { GlobalContextProvider } from "./Context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <GlobalContextProvider>
                <ToastContainer />
                <MainRoute />
            </GlobalContextProvider>
        </div>
    );
}

export default App;
