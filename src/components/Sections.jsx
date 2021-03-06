import {Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sectionsList} from '../store/crucialData';
import {selectSectionInfo, setSelected} from '../store/sectionSlice';
import {nanoid} from "@reduxjs/toolkit";
import {selectPathName} from "../store/serverSlice";
import {restoreArticlesState} from "../store/articlesSlice";
import {selectCurrentPath} from "../store/searchSlice";

export default function Sections() {
    const sectionInfo = useSelector(selectSectionInfo);

    const dispatch = useDispatch();

    // onWheel event handler to provide horizontal scroll with mouse
    // const horizontalScroll = e => {
    //     // e.preventDefault();
    //     const sections = document.getElementById("sections");
    //     const sectionsScrollPosition = document.getElementById("sections").scrollLeft;
    //     sections.scrollTo({
    //         top: 0,
    //         left: sectionsScrollPosition + e.deltaY,
    //         behaviour: "smooth"
    //     });
    // };

    const defaultButton = ['section-button', 'section-button-scrollable'];
    const defaultSection = ['sections', 'scrollable-sections', 'section-borders'];
    const [buttonClasses, setButton] = useState(defaultButton);
    const [sectionClasses, setSection] = useState(defaultSection);
    // const [defaultWheel, setWheelEvent] = useState(true)
    const [expanded, setExpanded] = useState(false);

    let restoringHandler;

    const serverSidePathName = useSelector(selectPathName) // for a server's info, servers will be null after first render of arcticles
    const clientSidePathName = useSelector(selectCurrentPath) // for a clients' info
    //console.log("serverSidePathName(sections): " + serverSidePathName)
    //("clientSidePathName(sections): " + clientSidePathName)
    let pathName = clientSidePathName !== "" && clientSidePathName!== undefined ? clientSidePathName : serverSidePathName
    switch(pathName){
    case "/":
        restoringHandler = (e)=> {
            //well, right now we at the main page
            //console.log("switched section")
            dispatch(restoreArticlesState())
            dispatch(setSelected({
                sectionId: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][0],
                sectionText: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][1],
            }));
        }
        break;
    case "/search":
        restoringHandler = (e)=> {
            //well, right now we at the search page
            //console.log("switched section")
            dispatch(restoreArticlesState())
            dispatch(setSelected({
                sectionId: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][0],
                sectionText: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][1],
            }));
        }
        break;

    case "/article":
        restoringHandler = (e)=> {
            //well, right now we at the single article page
            //console.log("switched section")
            dispatch(setSelected({
                sectionId: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][0],
                sectionText: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][1],
            }));
        }
        break;
    }

    // transform scrollable sections into full div
    const onExpand = () => {
        let currentButton = buttonClasses;
        let currentSection = sectionClasses;
        const forDelSection = ['scrollable-sections', 'section-borders'];
        currentSection = currentSection.filter((item) => !forDelSection.includes(item));
        // currentSection.push("d-flex-inline", "justify-content-around")
        setSection(currentSection);

        // to prevent strange behavior of supposedly unscrollable expanded div
        // setWheelEvent(false)
        setExpanded(true);
        currentButton = currentButton.filter((item) => item !== 'section-button-scrollable');
        currentButton.push('section-button-margin');
        setButton(currentButton);
        //console.log('onExpand fired');
    };

    // shrink sections back
    const onShrink = () => {
        let currentButton = buttonClasses;
        const currentSection = sectionClasses;
        currentSection.push('scrollable-sections', 'section-borders');
        setSection(currentSection);
        // setWheelEvent(true)
        setExpanded(false);
        currentButton = currentButton.filter((item) => item !== 'section-button-margin');
        currentButton.push('section-button-scrollable');
        setButton(currentButton);
        //console.log('onShrink fired');
    };

    const buttons = [];
    for (let i = 0; i < Object.keys(sectionsList).length; i += 1) {
        if (sectionInfo !== undefined) {
            if (sectionInfo.sectionId === Object.entries(sectionsList)[i][0]) {
                buttons.push(
                    <Button
                        key={nanoid()}
                        className={buttonClasses.join(' ') + " selected-section-btn"}
                    >
                        <p className="section-text">{Object.entries(sectionsList)[i][1]}</p>
                    </Button>,
                );
            } else {
                buttons.push(
                    <Button
                        data-sectionid = {i}
                        key={nanoid()}
                        variant="outline-primary"
                        className={buttonClasses.join(' ')}
                        onClick={restoringHandler}
                    >
                        <p className="section-text">{Object.entries(sectionsList)[i][1]}</p>
                    </Button>)
            }
        } else {
            buttons.push(
                <Button
                    data-sectionid = {i}
                    key={nanoid()}
                    variant="outline-primary"
                    className={buttonClasses.join(' ')}
                    onClick={restoringHandler}
                >
                    <p className="section-text">{Object.entries(sectionsList)[i][1]}</p>
                </Button>,
            );
        }
    }

    // let wheelHandler = defaultWheel ? horizontalScroll : undefined
    const expandHandler = expanded ? onShrink : onExpand;

    return (
        <>
            <Row>
                <div data-cy="sections-div" className={sectionClasses.join(' ')} id="sections">
                    {buttons}
                </div>
            </Row>
            {!expanded
            && (
                <Row>
                    <div className="w-100 pt-1 section-borders"/>
                </Row>
            )}
            <Row>
                <Button
                    onClick={expandHandler}
                    data-cy = "expand-btn"
                    className="expand-button d-flex justify-content-between align-items-center"
                    variant="outline-primary"
                >
                    {!expanded && (
                        <>
                            <p className="ml-2 expand-button-text">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 7L12 10.5L8.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.5 13L12 16.5L8.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                            <p className="mr-2 expand-button-text">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 7L12 10.5L8.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.5 13L12 16.5L8.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                        </>
                    )}
                    {expanded && (
                        <>
                            <p className="ml-2 expand-button-text">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 16.5L12 13L8.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.5 10.5L12 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                            <p className="mr-2 expand-button-text">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 16.5L12 13L8.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.5 10.5L12 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                        </>
                    )}
                </Button>
            </Row>
        </>
    );
}
