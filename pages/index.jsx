import Head from 'next/head'
import styles from '../styles/Index.module.css'
import {Container, Row, Col, Navbar, Form, FormControl} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import React, {useRef, useState} from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import SectionButton from "../components/section_button";
import Sections from "../components/sections";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
    selectSectionInfo,
    selectSectionSelected,
    setUnselected
} from "../store/sectionSlice";
import News from "../components/news";
import Image from "next/image";
import {restoreNewsState} from "../store/newsSlice";

export default function Home() {
    console.log("(Re)render happened!")
    // to make tooltip work
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const sectionSelected = useSelector(selectSectionSelected)
    console.log("Redux state from input, sectionSelected: " + sectionSelected)
    const sectionInfo = useSelector(selectSectionInfo)
    console.log("Redux state from input, sectionInfo: " + sectionInfo)
    const dispatch = useDispatch()

    return (
        <>
            <Head>
                <title>NEWSorcery</title>
                <meta name="description" content="Shmoll practice"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                    crossOrigin="anonymous"/>
            </Head>
            <Container>
                <Navbar id="navbar" expand="lg" className="mt-5" variant="light" bg="light">
                    <Navbar.Brand className="brand" href="#">NEWSorcery</Navbar.Brand>
                    <Form className="d-flex w-100">
                        {sectionSelected &&
                        <SectionButton text={sectionInfo.sectionText} onClick={e => {dispatch(restoreNewsState()) ;dispatch(setUnselected())}}>

                        </SectionButton>
                        }
                        <FormControl
                            className="squared colored_search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Button className="squared ml-1" variant="outline-primary">Search</Button>
                        <Button className="ml-1 info_button d-none" variant="outline-primary" ref={target}
                            onClick={() => setShow(!show)}>
                            <img className="info_img" src="/info.svg" alt="info button logo"/>
                        </Button>
                        <Overlay target={target.current} show={show} placement="bottom-end">
                            {(props) => (
                                <Tooltip {...props}>
                                    API was generously provided by <a className="link_to_tg"
                                        href="https://www.theguardian.com">the
                                        Guardian</a>.
                                </Tooltip>
                            )}
                        </Overlay>
                    </Form>

                </Navbar>
                <Sections>

                </Sections>
                <News/>
                <div className = "fixed-bottom">
                    <a href="#" className="go_up">
                        <img className="arrow_up_img" src="/arrow_up.png" alt="arrow up to top"/>
                    </a>
                </div>
            </Container>

        </>
    )
}
