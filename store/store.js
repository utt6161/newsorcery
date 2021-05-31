import {combineReducers, configureStore} from '@reduxjs/toolkit'
import sectionReducer from "./sectionSlice"
import newsReducer from "./newsSlice"
import serverReducer from "./serverSlice"
import searchReducer from "./searchSlice"
import articlesReducer from "./articlesSlice"
import {createWrapper} from "next-redux-wrapper";

const rootReducer = combineReducers({
    server: serverReducer,
    section: sectionReducer,
    news: newsReducer,
    search: searchReducer,
    articles: articlesReducer
})

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer
    });
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./store', () => store.replaceReducer(rootReducer));
    }

    return store;
}

export const wrapper = createWrapper(makeStore);

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

