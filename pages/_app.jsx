import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Global.css"

import React from "react";
import {Provider} from "react-redux";
import {Store} from "../store/store"

function MyApp({Component, pageProps}) {
    return (
        <React.StrictMode>
            <Provider store={Store}>
                <Component {...pageProps} />
            </Provider>
        </React.StrictMode>
    )
}

export default MyApp
