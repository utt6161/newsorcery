import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from "./sectionSlice"
import newsReducer from "./newsSlice"

export const Store = configureStore({
    reducer: {
        section: sectionReducer,
        news: newsReducer
    },
    // preloadedState :{
    //     section: {
    //         sectionSelected: false,
    //         sectionInfo: {
    //             sectionId: "",
    //             sectionText: ""
    //         }
    //     },
    //     news: {
    //         isErrored: false,
    //         isFetching: false,
    //         newsData: [],
    //         currentPage: 1
    //     }
    // }

})
