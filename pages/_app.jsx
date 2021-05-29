import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Global.css"

import React from "react";
import {Provider} from "react-redux";
import {Store} from "../store/store"
import { wrapper } from "../store/store";
import {setPathAndQuery} from "../store/serverSlice";

function MyApp({ Component, pageProps, appProps }) {
    return (
        <React.StrictMode>
            <Component {...appProps} {...pageProps} />
        </React.StrictMode>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    ctx.store.dispatch(
        setPathAndQuery({
            pathName: ctx.pathname,
            query: ctx.query,
        })
    );
    return {
        pageProps: {
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}),
        },
        appProps: { appInitialProcessEnv: process.env.APP_PROP },
    };
};

export default wrapper.withRedux(MyApp);

