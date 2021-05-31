import Sections from "../components/Sections";
import {News} from "../components/News";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectQuery, setPathAndQuery} from "../store/serverSlice";
import {setSelected} from "../store/sectionSlice";
import {setSearchText} from "../store/searchSlice";
import ArticlesList from "../components/Articles";
import {setCurrentPage} from "../store/articlesSlice";

export default function Search(){

    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const setSectionAndSearch = useRef(true)
    useEffect(()=>{
        if(setSectionAndSearch.current) {
            if (query.hasOwnProperty("sectionId") && query.hasOwnProperty("sectionText")) {
                dispatch(setSelected({
                    sectionId: query.sectionId,
                    sectionText: query.sectionText,
                }));
            }
            if(query.hasOwnProperty("q")){
                dispatch(setSearchText(query.q))
            }
            if(query.hasOwnProperty("page")){
                dispatch(setCurrentPage(query.page))
            }
            setSectionAndSearch.current = false
        }
    })


    return(
        <>
            <Sections/>
            <ArticlesList/>
        </>
    )
}
