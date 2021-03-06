import "bootstrap/dist/css/bootstrap.min.css"
import "../src/styles/Global.css"
import React, {useRef, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../src/store/store"
import {selectOrigin, selectPathName, setPathAndQuery} from "../src/store/serverSlice";
import Head from "next/head";
import {Container, Navbar} from "react-bootstrap";
import SectionButton from "../src/components/SectionButton";
import {selectSectionInfo, selectSectionSelected, setUnselected} from "../src/store/sectionSlice";
import Button from "react-bootstrap/Button";
import {selectCurrentPath, selectSearchText, setCurrentPath, setSearchText} from "../src/store/searchSlice";
import {restoreArticlesState} from "../src/store/articlesSlice";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Fade from "react-bootstrap/Fade";
import SettingsIcon from "../src/components/SettingsIcon";
import Modal from "react-bootstrap/Modal";
import Switch from "../src/components/Switch";
import {selectSwitch, setSwitch, toggleSwitch} from "../src/store/switchSlice";
import Cookies from "js-cookie/src/js.cookie"

function MyApp({ Component, pageProps, appProps }) {

    // to make tooltip work
    // const [show, setShow] = useState(false);
    // const target = useRef(null);

    const dispatch = useDispatch()
    const settingsSwitch = useSelector(selectSwitch)
    const cookiesSettingsSwitch = Cookies.get("switch")
    useEffect(()=>{
        if( (settingsSwitch.toString() !== cookiesSettingsSwitch) && cookiesSettingsSwitch !== undefined ){
            dispatch(toggleSwitch())
        }
    })


    const search = useSelector(selectSearchText)
    const serverSidePathName = useSelector(selectPathName) // for a server's info, servers will be null after first render of articles
    const clientSidePathName = useSelector(selectCurrentPath) // for a clients' info
    //console.log("serverSidePathName(_appjs): " + serverSidePathName)
    //console.log("clientSidePathName(_appjs): " + clientSidePathName)
    const sectionSelected = useSelector(selectSectionSelected)
    const sectionInfo = useSelector(selectSectionInfo)
    const setSearchInfo = useRef(true)
    const [showAnchor, setShowAnchor] = useState(false);
    const [modalShow, setModalShow] = useState(false); // for a modal with settings
    useEffect(()=>{
        if(setSearchInfo.current) {
            dispatch(setCurrentPath(serverSidePathName))
        }
        setSearchInfo.current = false
    })
    const searchLocation = `/search?&q=${search}${sectionSelected ? "&sectionId=" + sectionInfo.sectionId : ""}`

    const onSearchHandler = (event) => {
        event.preventDefault()
        window.location = searchLocation
    }

    // const [isNotEvenRows, setRows] = useState(true)

    const [showSettings, setShowSettings] = useState(false) // for a settings button
    let restoringHandler;
    let pathName = clientSidePathName !== "" && clientSidePathName!== undefined ? clientSidePathName : serverSidePathName
    switch(pathName){
    case "/":
        restoringHandler = (e)=> {
            dispatch(restoreArticlesState());
            dispatch(setUnselected())
        }
        useEffect(()=>{
            setShowSettings(true)
        },[showSettings])
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

    let setScrollAnchorListener = useRef(true)
    useEffect(()=>{
        if(setScrollAnchorListener) {
            window.addEventListener('scroll', (event) => {
                let yOffset = window.pageYOffset
                if (yOffset > 1200) {
                    setShowAnchor(true)
                } else {
                    setShowAnchor(false)
                }
            })
        }
        setScrollAnchorListener = false
    },)
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
    // <script defer src="https://platform.twitter.com/widgets.js" charSet="utf-8"/>
    return (
        <>
            <Head>
                <title>NEWSorcery</title>
                <meta name="description" content="Shmoll practice"/>

                <link rel="stylesheet" href={"https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"}
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"/>
                <link rel="apple-touch-icon" sizes="180x180" href={"/apple-touch-icon.png"}/>
                <link rel="icon" type="image/png" sizes="32x32" href={"/favicon-32x32.png"}/>
                <link rel="icon" type="image/png" sizes="16x16" href={"/favicon-16x16.png"}/>
                <link rel="manifest" href={"/site.webmanifest"}/>
            </Head>
            <Container>
                <Navbar id="navbar" expand="lg" className="mt-5" variant="light">
                    <a data-cy = "brand-link" className="navbar-brand brand" id = "top" href="/">NEWSorcery</a>
                    <div className="d-flex w-100">
                        {sectionSelected &&
                        <SectionButton text={sectionInfo.sectionText} onClick={restoringHandler}>

                        </SectionButton>
                        }
                        <input data-cy = "search-input" placeholder="Search" aria-label="Search" value={search} onChange = {(e) => {dispatch(setSearchText(e.target.value))}}
                            className="squared colored-search form-control" onKeyUp={({key}) =>{
                                if (key === "Enter") {
                                    window.location = searchLocation
                                }}}/>
                        <Button data-cy = "search-btn" className="squared ml-1" onClick = {onSearchHandler} variant="outline-primary">Search</Button>
                        {showSettings &&
                            <>
                            <Button data-cy = "settings-btn" className="squared settings-button ml-1 px-2 py-0" onClick = {() => setModalShow(true)} variant="outline-primary">
                                <SettingsIcon className = "settings-gear"/>
                            </Button>
                            <Modal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered >
                                <Modal.Header closeButton>
                                    <Modal.Title>Settings (still unstable, sry)</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="d-flex">
                                        <span className = "align-self-center" style = {{fontSize: "1.3rem"}}>Rows aren't even in height: </span>
                                        <div className="d-inline-block ml-2" style = {{verticalAlign: "middle"}}>
                                            <Switch
                                                isOn={settingsSwitch}
                                                handleObject={{dispatcher: dispatch, reducer: setSwitch}}/>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            </>}
                    </div>

                </Navbar>

                <Component {...appProps} {...pageProps} />
                <div className = "fixed-bottom">
                    <Fade in={showAnchor}>
                        <AnchorLink data-cy = "anchor-btn" href='#top' className = "go-up">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 240.835 240.835"
                                version="1.1"
                                viewBox="0 0 240.835 240.835"
                                xmlSpace="preserve"
                            >
                                <path d="M129.007 57.819c-4.68-4.68-12.499-4.68-17.191 0L3.555 165.803c-4.74 4.74-4.74 12.427 0 17.155 4.74 4.74 12.439 4.74 17.179 0l99.683-99.406 99.671 99.418c4.752 4.74 12.439 4.74 17.191 0 4.74-4.74 4.74-12.427 0-17.155L129.007 57.819z"/>
                            </svg>
                        </AnchorLink>
                    </Fade>
                </div>
            </Container>
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    ctx.store.dispatch(
        setPathAndQuery({
            pathName: ctx.pathname,
            query: ctx.query,
            req: ctx.req.headers.origin
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

//
// if(process.browser){
//     window.store = wrapper.withRedux()
// }

export default wrapper.withRedux(MyApp);

