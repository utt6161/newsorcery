import Sections from "../components/Sections";
import {News} from "../components/News";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectQuery, setPathAndQuery} from "../store/serverSlice";
import {setSelected} from "../store/sectionSlice";
import {setSearchText} from "../store/searchSlice";
import ArticlesList from "../components/Articles";
import {setCurrentPage, restoreArticlesState} from "../store/articlesSlice";

export default function Search(){

    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const setSectionAndSearch = useRef(true)
    useEffect(()=>{
        if(setSectionAndSearch.current) {
            if (query.hasOwnProperty("sectionId") && query.hasOwnProperty("sectionText")) {
                console.log("dispatched the section info from query")
                dispatch(setSelected({
                    sectionId: query.sectionId,
                    sectionText: query.sectionText,
                }));
            }
            console.log("searchjs, query.q = " + query.q)
            if(query.hasOwnProperty("q")){
                // IN CASE IF A QUERY PARAM IS EMPTY (like someurl.com?&q= ) THE QUERY GETS A STRING "undefined"
                // LIKE HOW AND WHY???
                if(query.q === "undefined" || query.q === "" || query.q === undefined){
                    console.log("setting search text to blank")
                    dispatch(setSearchText(""))
                } else {
                    console.log("setting search text to data from query")
                    dispatch(setSearchText(query.q))
                }

            }
            // if(query.hasOwnProperty("page")){
            //     dispatch(setCurrentPage(query.page ?? 1))
            // }
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
