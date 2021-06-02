import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Global.css"
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../store/store"
import {selectPathName, setPathAndQuery} from "../store/serverSlice";
import Head from "next/head";
import {Container, Navbar} from "react-bootstrap";
import SectionButton from "../components/SectionButton";
import {restoreNewsState} from "../store/newsSlice";
import {selectSectionInfo, selectSectionSelected, setUnselected} from "../store/sectionSlice";
import Button from "react-bootstrap/Button";
import {selectCurrentPath, selectSearchText, setCurrentPath, setSearchText} from "../store/searchSlice";
import {currentURL, sectionsList} from "../store/crucialData";
import {restoreArticlesState} from "../store/articlesSlice";


function MyApp({ Component, pageProps, appProps }) {

    // to make tooltip work
    // const [show, setShow] = useState(false);
    // const target = useRef(null);

    const dispatch = useDispatch()
    const search = useSelector(selectSearchText)
    const serverSidePathName = useSelector(selectPathName) // for a server's info, servers will be null after first render of arcticles
    const clientSidePathName = useSelector(selectCurrentPath) // for a clients' info
    //console.log("serverSidePathName(_appjs): " + serverSidePathName)
    //console.log("clientSidePathName(_appjs): " + clientSidePathName)
    const sectionSelected = useSelector(selectSectionSelected)
    const sectionInfo = useSelector(selectSectionInfo)
    const setSearchInfo = useRef(true)
    useState(()=>{
        if(setSearchInfo.current) {
            dispatch(setCurrentPath(serverSidePathName))
        }
        setSearchInfo.current = false
    })
    const searchLocation = `${currentURL}/search?&q=${search}${sectionSelected ? "&sectionId=" + sectionInfo.sectionId : ""}`

    const onSearchHandler = (event) => {
        event.preventDefault()
        window.location = searchLocation
    }

    let restoringHandler;
    let pathName = clientSidePathName !== "" && clientSidePathName!== undefined ? clientSidePathName : serverSidePathName
    switch(pathName){
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

    // <FormControl
    //     className="squared colored-search"
    //     as = "input"
    //     placeholder="Search"
    //     aria-label="Search"
    //     onChange = {(e) => {dispatch(setSearchText(e.target.value))}}
    //     value = {search}
    //     onKeyUp = {(e) => {onSearchHandler}}
    // />

    // const [enterHandler, setEnterHandler] = useState()
    // useEffect(()=>{
    //     setEnterHandler(
    //     })
    // }, [sectionInfo, searchLocation])

    // <script defer src="https://platform.twitter.com/widgets.js" charSet="utf-8"/>
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
                <Navbar id="navbar" expand="lg" className="mt-5" variant="light">
                    <Navbar.Brand className="brand" href={currentURL}>NEWSorcery</Navbar.Brand>
                    <div className="d-flex w-100">
                        {sectionSelected &&
                        <SectionButton text={sectionInfo.sectionText} onClick={restoringHandler}>

                        </SectionButton>
                        }
                        <input placeholder="Search" aria-label="Search" value={search} onChange = {(e) => {dispatch(setSearchText(e.target.value))}}
                            className="squared colored-search form-control" onKeyUp={({key}) =>{
                                if (key === "Enter") {
                                    window.location = searchLocation
                                }}}/>
                        <Button className="squared ml-1" onClick = {onSearchHandler} variant="outline-primary">Search</Button>

                    </div>

                </Navbar>

                <Component {...appProps} {...pageProps} />
                <div className = "fixed-bottom">
                    <a href="#" className="go-up">
                        <img className="arrow-up-img" src="/arrow_up.png" alt="arrow up to top"/>
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

