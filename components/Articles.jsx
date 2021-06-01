import {connect, useDispatch, useSelector} from 'react-redux';
import React, {
    useEffect, useRef, useState
} from 'react';

import {nanoid} from "@reduxjs/toolkit";
import {ArticlesItem} from "./ArticlesItem";
import {fetchArticles, incrementPage, restoreArticlesState, selectCurrentPage} from "../store/articlesSlice";
import ReactPaginate from 'react-paginate';
import {useInfiniteScroll} from "../customHooks/InfiniteScroll";
import {currentURL} from "../store/crucialData";
import {restoreNewsState} from "../store/newsSlice";
import {setServerStateClear} from "../store/serverSlice";

const checkIfEq = (left, right) => {
    return JSON.stringify(left) !== JSON.stringify(right)
}


const mapStateToProps = state => {
    return {
        articlesData: state.articles.articlesData,
        currentPage: state.articles.currentPage,
        totalPages: state.articles.totalPages,
        sectionSelected: state.section.sectionSelected,
        sectionInfo: state.section.sectionInfo,
        searchText: state.search.searchText,
        query: state.server.query
    }
}

export function Articles(props) {

    //console.log('Articles are rerendered');

    const dispatch = useDispatch();
    const [toRender, setToRender] = useState([])
    // console.log("urlSectionId: " + props.query.sectionId)
    // console.log("query.q: " + props.query.q)
    // const skippedFirstFecth = useRef(false)
    useEffect(() => {
        //console.log("fetching news")
        let sectionIdToFetch
        if (props.sectionSelected || props.query.sectionId){
            // check for undefined might be redundant, but anyway, cant be too careful
            if (props.sectionInfo.sectionId !== "" && props.sectionInfo.sectionId !== undefined){
                sectionIdToFetch = props.sectionInfo.sectionId
            } else {
                sectionIdToFetch = props.query.sectionId
            }
        }
        let searchTextToFetch
        if (props.searchText || props.query.q){
            // check for undefined might be redundant, but anyway, cant be too careful
            if(props.searchText !== "" && props.searchText !== undefined){
                searchTextToFetch = props.searchText
            } else {
                searchTextToFetch = props.query.q
            }
        }
        // if(skippedFirstFecth.current) {
        // console.log("params for a fetch. searchText: " + searchTextToFetch + " , sectionId: " + sectionIdToFetch)
        dispatch(fetchArticles({
            currentPage: props.currentPage ?? 1,
            sectionSelected: props.sectionSelected ?? false,
            // a wierd way to make initial fetching with sections work
            sectionInfo: {
                sectionId: sectionIdToFetch
            },
            searchText: searchTextToFetch
        }))
        dispatch(setServerStateClear())
        // } else {
        //     skippedFirstFecth.current = false
        // }
        // console.log(props.query)
    }, [dispatch, props.currentPage, props.sectionInfo.sectionId])

    // useEffect(()=>{
    //     dispatch(restoreArticlesState())
    // },[props.sectionInfo])

    useEffect(() => {
        let toRenderBuffer = []
        //console.log("news data from the component")

        for (let i in props.articlesData) {
            toRenderBuffer.push(
                <ArticlesItem key={props.articlesData[i].id} data={props.articlesData[i]}/>
            );
        }
        if (props.totalPages !== undefined && props.totalPages === 0) {
            toRenderBuffer.push(
                <div key = {nanoid()}>
                    <h1 style={{color: "#1f8afe"}} className="px-4 pt-4 text-center">Couldn&apos;t find anything</h1>
                    <h5 style={{color: "#1f8afe"}} className="text-center">try again, perhaps?</h5>
                </div>
            )
        }
        setToRender(toRenderBuffer)
    },
    [props.articlesData])

    let bottomBoundaryRef = useRef(null)
    useInfiniteScroll(bottomBoundaryRef, dispatch, incrementPage)


    // fetchArticles is an asyncThunk, check articlesSlice


    const paginationLinks = (pageIndex) => {
        return `${currentURL}/search?&q=${props.query.q}${props.sectionSelected ? "&sectionId=" + props.sectionInfo.sectionId + "&sectionText=" + props.sectionInfo.sectionText : ""}"&page="${pageIndex}`
    }

    // const [boundaryDiv, setBoundaryDiv] = useState([])
    // useEffect(()=>{
    //     if(props.currentPage < props.totalPages){
    //         setBoundaryDiv(<div id='page-bottom-boundary' className="boundary_div_news" ref={bottomBoundaryRef}/>)
    //     }
    // },[])

    // (lets assemble the pagination, if there is such need)
    // if only it could work
    // const [pagination, setPagination] = useState([])
    // useEffect(() => {
    //     if(props.totalPages>1){
    //         setPagination(
    //             <ReactPaginate
    //                 previousLabel={'<'}
    //                 nextLabel={'>'}
    //                 breakLabel={'...'}
    //                 pageCount={props.totalPages}
    //                 marginPagesDisplayed={2}
    //                 pageRangeDisplayed={5}
    //                 hrefBuilder = {paginationLinks}
    //                 initialPage = {props.currentPage}
    //                 containerClassName={'pagination'}
    //                 pageClassName = {"page-item"}
    //                 pageLinkClassName = {"page-link"}
    //                 nextClassName = {"page-item"}
    //                 previousClassName = {"page-item"}
    //                 nextLinkClassName = {"page-link"}
    //                 previousLinkClassName = {"page-link"}
    //                 breakClassName = {"page-item"}
    //                 breakLinkClassName = {"page-link"}
    //                 activeClassName={'active'}
    //             />
    //         )
    //     }
    // },[props.totalPages])

    return (
        <>
            {toRender}
            <div id='page-bottom-boundary' className="boundary-div-news" ref={bottomBoundaryRef}/>
        </>
    );
}

export default connect(mapStateToProps)(Articles)
