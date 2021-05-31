import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Global.css"

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../store/store"
import {selectPathName, setPathAndQuery} from "../store/serverSlice";
import Head from "next/head";
import {Container, Form, FormControl, Navbar} from "react-bootstrap";
import SectionButton from "../components/SectionButton";
import {restoreNewsState} from "../store/newsSlice";
import {selectSectionInfo, selectSectionSelected, setSelected, setUnselected} from "../store/sectionSlice";
import Button from "react-bootstrap/Button";
import {selectSearchText, setSearchText} from "../store/searchSlice";
import {currentURL, sectionsList} from "../store/crutial_data";
import {restoreArticlesState} from "../store/articlesSlice";


function MyApp({ Component, pageProps, appProps }) {

    // to make tooltip work
    // const [show, setShow] = useState(false);
    // const target = useRef(null);

    const dispatch = useDispatch()
    const search = useSelector(selectSearchText)

    const sectionSelected = useSelector(selectSectionSelected)
    const sectionInfo = useSelector(selectSectionInfo)

    const onSearchHandler = (event) => {
        event.preventDefault()
        window.location = `${currentURL}/search?&q=${search}${sectionSelected ? "&sectionId=" + sectionInfo.sectionId + "&sectionText=" + sectionInfo.sectionText : ""}`
    }

    let restoringHandler;
    const currentPathName = useSelector(selectPathName)
    switch(currentPathName){
    case "/":
        restoringHandler = (e)=> {
            dispatch(restoreNewsState());
            dispatch(setUnselected())
        }
        break;
    case "/search":
        restoringHandler = (e)=> {
            dispatch(restoreArticlesState());
            dispatch(setUnselected())
        }
        break;

    case "/article":
        restoringHandler = (e) => {
            dispatch(setUnselected())
        }
        break;
    }


    // tooltip thing, biohazard
    //         <Button className="ml-1 info_button d-none" variant="outline-primary" ref={target}
    //     onClick={() => setShow(!show)}>
    // <img className="info_img" src="/info.svg" alt="info button logo"/>
    //         </Button>
    //     <Overlay target={target.current} show={show} placement="bottom-end">
    //         {(props) => (
    //             <Tooltip {...props}>
    //                 API was generously provided by <a className="link_to_tg"
    //                                                   href="https://www.theguardian.com">the
    //                 Guardian</a>.
    //             </Tooltip>
    //         )}
    //     </Overlay>


    return (
        <React.StrictMode>
            <Head>
                <title>NEWSorcery</title>
                <meta name="description" content="Shmoll practice"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"/>
            </Head>
            <Container>
                <Navbar id="navbar" expand="lg" className="mt-5" variant="light" bg="light">
                    <Navbar.Brand className="brand" href={currentURL}>NEWSorcery</Navbar.Brand>
                    <Form className="d-flex w-100">
                        {sectionSelected &&
                        <SectionButton text={sectionInfo.sectionText} onClick={restoringHandler}>

                        </SectionButton>
                        }
                        <FormControl
                            className="squared colored_search"
                            as = "input"
                            placeholder="Search"
                            aria-label="Search"
                            onChange = {(e) => {dispatch(setSearchText(e.target.value))}}
                            value = {search}
                        />
                        <Button className="squared ml-1" onClick = {onSearchHandler} variant="outline-primary">Search</Button>

                    </Form>

                </Navbar>

                <Component {...appProps} {...pageProps} />
                <div className = "fixed-bottom">
                    <a href="#" className="go_up">
                        <img className="arrow_up_img" src="/arrow_up.png" alt="arrow up to top"/>
                    </a>
                </div>
            </Container>
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

