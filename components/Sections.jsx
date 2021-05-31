import {Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sectionsList} from '../store/crutial_data';
import {selectSectionInfo, setSelected} from '../store/sectionSlice';
import {restoreNewsState} from "../store/newsSlice";
import {nanoid} from "@reduxjs/toolkit";
import {selectPathName} from "../store/serverSlice";
import {restoreArticlesState} from "../store/articlesSlice";

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

    const defaultButton = ['section_button', 'section_button_scrollable'];
    const defaultSection = ['sections', 'scrollable_sections', 'section_borders'];
    const [buttonClasses, setButton] = useState(defaultButton);
    const [sectionClasses, setSection] = useState(defaultSection);
    // const [defaultWheel, setWheelEvent] = useState(true)
    const [expanded, setExpanded] = useState(false);

    let restoringHandler;

    const currentPathName = useSelector(selectPathName)
    switch(currentPathName){
    case "":
        restoringHandler = (e)=> {
            //well, right now we at the main page then
            dispatch(restoreNewsState())
            dispatch(setSelected({
                sectionId: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][0],
                sectionText: Object.entries(sectionsList)[e.currentTarget.dataset.sectionid][1],
            }));
        }
        break;
    case "/search":
        restoringHandler = (e)=> {
            //well, right now we at the main page then
            dispatch(restoreArticlesState())
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
        const forDelSection = ['scrollable_sections', 'section_borders'];
        currentSection = currentSection.filter((item) => !forDelSection.includes(item));
        // currentSection.push("d-flex-inline", "justify-content-around")
        setSection(currentSection);

        // to prevent strange behavior of supposedly unscrollable expanded div
        // setWheelEvent(false)
        setExpanded(true);
        currentButton = currentButton.filter((item) => item !== 'section_button_scrollable');
        currentButton.push('section_button_margin');
        setButton(currentButton);
        console.log('onExpand fired');
    };

    // shrink sections back
    const onShrink = () => {
        let currentButton = buttonClasses;
        const currentSection = sectionClasses;
        currentSection.push('scrollable_sections', 'section_borders');
        setSection(currentSection);
        // setWheelEvent(true)
        setExpanded(false);
        currentButton = currentButton.filter((item) => item !== 'section_button_margin');
        currentButton.push('section_button_scrollable');
        setButton(currentButton);
        console.log('onShrink fired');
    };

    const buttons = [];
    for (let i = 0; i < Object.keys(sectionsList).length; i += 1) {
        if (sectionInfo !== undefined) {
            if (sectionInfo.sectionId === Object.entries(sectionsList)[i][0]) {
                buttons.push(
                    <Button
                        key={nanoid()}
                        variant="primary"
                        className={buttonClasses.join(' ')}
                    >
                        <p className="section_text">{Object.entries(sectionsList)[i][1]}</p>
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
                        <p className="section_text">{Object.entries(sectionsList)[i][1]}</p>
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
                    <p className="section_text">{Object.entries(sectionsList)[i][1]}</p>
                </Button>,
            );
        }
    }

    // let wheelHandler = defaultWheel ? horizontalScroll : undefined
    const expandHandler = expanded ? onShrink : onExpand;

    return (
        <>
            <Row>
                <div className={sectionClasses.join(' ')} id="sections">
                    {buttons}
                </div>
            </Row>
            {!expanded
            && (
                <Row>
                    <div className="w-100 pt-1 section_borders"/>
                </Row>
            )}
            <Row>
                <Button
                    onClick={expandHandler}
                    className="expand_button d-flex justify-content-between align-items-center"
                    variant="outline-primary"
                >
                    {!expanded && (
                        <>
                            <p className="ml-2 expand_button_text">⮮</p>
                            <p className="mr-2 expand_button_text">⮯</p>
                        </>
                    )}
                    {expanded && (
                        <>
                            <p className="ml-2 expand_button_text">⮬</p>
                            <p className="mr-2 expand_button_text">⮭</p>
                        </>
                    )}
                </Button>
            </Row>
        </>
    );
}
