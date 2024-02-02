import "./App.css";

import React from "react";
import MainRoute from "./Helper/MainRoute/MainRoute";
import { GlobalContextProvider } from "./Context/GlobalContext";

function App() {
    return (
        <div id="h-body" className="background">
            <GlobalContextProvider>
                <MainRoute />
            </GlobalContextProvider>
        </div>
    );
}

export default App;
