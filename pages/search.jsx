import Sections from "../src/components/Sections";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectQuery} from "../src/store/serverSlice";
import {setSelected} from "../src/store/sectionSlice";
import {setSearchText} from "../src/store/searchSlice";
import ArticlesList from "../src/components/SearchList";

export default function Search(){
    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const setSectionAndSearch = useRef(true)
    useEffect(()=>{
        if(setSectionAndSearch.current) {
            if (query.hasOwnProperty("sectionId")) {
                dispatch(setSelected({
                    sectionId: query.sectionId,
                }));
            }
            if(query.hasOwnProperty("q")){
                // IN CASE IF A QUERY PARAM IS EMPTY (like someurl.com?&q= ) THE QUERY GETS A STRING "undefined"
                // i mean.. i get (partially) why its like that.. but still
                if(query.q === "undefined" || query.q === "" || query.q === undefined){
                    dispatch(setSearchText(""))
                } else {
                    dispatch(setSearchText(query.q))
                }
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
