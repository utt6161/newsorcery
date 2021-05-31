import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import React, {
    useCallback, useEffect, useLayoutEffect, useRef, useState
} from 'react';
import axios from 'axios';
import {Masonry} from 'react-masonry-responsive';
import {newsAPI} from '../store/crutial_data';
import {
    selectIsFetching,
    setFetching,
    unsetFetching,
    selectIsErrored,
    setErrored,
    unsetErrored,

    incrementPage,
    restoreNewsState, selectNewsData, selectCurrentPage, setNewsData,
} from '../store/newsSlice';
import {selectSectionInfo, selectSectionSelected} from '../store/sectionSlice';
import NewsItem from './NewsItem';
import {useFetch} from '../custom_hooks/customHooks'
import {fetchNews} from "../store/newsSlice";
import {useInfiniteScroll, useLazyLoading} from "../custom_hooks/customHooks"
import {nanoid} from "@reduxjs/toolkit";
// import InfiniteScroller from "./infinite_scroller"

const checkIfEq = (left, right) => {
    return JSON.stringify(left) !== JSON.stringify(right)
}


const mapStateToProps = state => {
    return {
        newsData: state.news.newsData,
        currentPage: state.news.currentPage,
        sectionSelected: state.section.sectionSelected,
        sectionInfo: state.section.sectionInfo,
        searchText: state.search.searchText
    }
}

export function News(props) {

    console.log('News are rerendered');

    // const isFetching = useSelector(selectIsFetching);
    // const isErrored = useSelector(state => state.isErrored);
    // const newsData = useSelector(selectNewsData, checkIfEq)
    // const currentPage = useSelector(selectCurrentPage)
    const dispatch = useDispatch();
    const [toRender, setToRender] = useState([])

    // connect(mapStateToProps)(News)

    const skipNewsOnce = useRef(true);
    const skipSectionOnce = useRef(true)
    let bottomBoundaryRef = useRef(null)

    useInfiniteScroll(bottomBoundaryRef, dispatch, incrementPage)
    // useLazyLoading(".card-img-top", )

    useEffect(() => {
        if (!skipNewsOnce.current) {
            let toRenderBuffer = []
            console.log("news data from the component")

            for (let i in props.newsData) {
                // if(i % 10 === 0) {
                toRenderBuffer.push({
                    key: nanoid(),
                    node: <NewsItem data={props.newsData[i].fields}/>
                });
                // })
                // } else {
                //     toRenderBuffer.push({
                //         key: nanoid(),
                //         node: <NewsItem data={props.newsData[i].fields}/>
                //     })
                // }
            }
            setToRender(toRenderBuffer)
        } else {
            skipNewsOnce.current = false;
        }
    },
    [props.newsData])


    useEffect(() => {
        console.log("fetching news")
        dispatch(fetchNews({
            currentPage: props.currentPage ?? 1,
            sectionSelected: props.sectionSelected ?? false,
            sectionInfo: {
                sectionId: props.sectionInfo ? props.sectionInfo.sectionId : ""
            }
        }))
    }, [props.currentPage, props.sectionInfo])

    // useEffect(()=>{
    //     if(!skipSectionOnce.current) {
    //         dispatch(restoreNewsState())
    //     } else {
    //         skipSectionOnce.current = false
    //     }
    // }, props.sectionInfo)


    // useFetch(dispatch, currentPage, sectionSelected, sectionInfo)

    // there is an issue with redux realization, news state change did not trigger the rerender
    // const [newsData, setAnewData] = useState([]);


    // some sort of custom hook + the way to filter objects to prevent duplication after rendering
    // new entries because of the api call triggered by scrolling down (infinite scroll issues)
    // const setNewsData = (newNewsData, anew = false) => {
    //     if (anew) {
    //         setAnewData(newNewsData);
    //     } else {
    //         setAnewData([...newsData, ...newNewsData]
    //             .filter((value, index, self) => self
    //                 .findIndex((v) => v.id === value.id) === index));
    //     }
    // };

    // fetching shit (amazing, right?!)

    // initial fetch?
    // console.log("requesting the news")
    // let genericNewsLink = search_news_api
    // if(sectionSelected){
    //     genericNewsLink += ( "&section=" + sectionInfo.sectionId )
    // }
    // dispatch(toggleFetching())
    // fetchNews(1,genericNewsLink).then((response) => {
    //     // console.log(response)
    //     dispatch(setNewsData(response.data.response.results))
    //     dispatch(toggleFetching()) //OFF
    // })
    // .catch(reason => {
    //     console.log(reason)
    //     dispatch(toggleErrored())
    //     dispatch(toggleFetching()) //OFF
    // })

    // const fetchNews = async (page) => {
    //     const section = sectionInfo.sectionId ? sectionInfo.sectionId : undefined;
    //     const link = `${searchNewsApi}&page=${page}${section ? `&section=${section}` : ''}`;
    //     // ON
    //     dispatch(setFetching());
    //     dispatch(unsetErrored());
    //     return axios.get(link).then((response) => {
    //         dispatch(unsetFetching()); // OFF
    //         dispatch(incrementPage());
    //         setNewsData(response.data.response.results);
    //     })
    //         .catch((reason) => {
    //             console.log(reason);
    //             dispatch(setErrored());
    //             dispatch(unsetFetching()); // OFF
    //         });
    // };


    // useEffect(() => {
    // // console.log("requesting the news")
    // // let genericNewsLink = search_news_api
    // // if (sectionSelected) {
    // //     genericNewsLink += ("&section=" + sectionInfo.sectionId)
    // // }
    //     setAnewData([]);
    //     dispatch(restorePage());
    // }, [sectionInfo]);
    // let toRender = [];

    // useEffect(() => {
    //     if (!initialRender.current) {
    //         if (state.auth.rSignedIn) {
    //             history.push('/');
    //         } else {
    //             console.log(not
    //             signed in
    //         )
    //             ;
    //         }
    //     } else {
    //         initialRender.current = false;
    //     }
    // }, [state.auth.rSignedIn])
    // const initialRender = useRef(true);
    // if (!initialRender.current) {
    // if (!isFetching && !isErrored) {
    // console.log('assembling rows for news');
    // // for (let i = 0; i < newsData.length; i++) {
    // for (let i in newsData) {
    //     console.log(`iteration: ${i}`);
    //     toRender.push({
    //         key: i.toString(),
    //         node: <NewsItem data={newsData[i].fields}/>,
    //     });
    // }
    // console.log(toRender);
    // setToRender(toRenderBuffer)
    // }
    // } else {
    //     initialRender.current = false;
    // }

    // setToRender(toRenderBuffer)


    return (
        <>
            <Masonry
                items={toRender}
                gap={16}
                minColumnWidth={254}
            />
            <div id='page-bottom-boundary' className="boundary_div_news" ref={bottomBoundaryRef}/>
        </>
    );
}

export default connect(mapStateToProps)(News)
