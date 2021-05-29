import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit'
import axios from "axios";
import {searchNewsApi} from "./crutial_data";

export const fetchNews = createAsyncThunk(
    'users/fetchNews',
    async (paramObj, thunkAPI) => {
        const response = await axios.get(`${searchNewsApi}&page=${paramObj.currentPage ? paramObj.currentPage : 1}${paramObj.sectionSelected ? `&section=${paramObj.sectionInfo.sectionId}` : ''}`)
        return response.data.response.results
    })

export const newsSlice = createSlice({
    name: "news",
    initialState: {
        isErrored: false,
        isFetching: false,
        newsData: [],
        currentPage: 1
    },
    reducers: {

        incrementPage: (state) => {
            console.log("incrementing the page")
            state.currentPage++
        },

        restoreNewsState: state => {
            state.currentPage = 1
            state.newsData = []
        },

        // loadingErrored: (state) => {
        //     state.isErrored = true
        //     state.isFetching = false
        // },
        //
        // initiateLoading: state => {
        //     state.isErrored = false
        //     state.isFetching = true
        // },

        // setNewsData: (state, action) => {
        //     console.log("setting new news data, current news")
        //     let news = state.newsData ? [...state.newsData, ...action.payload] : action.payload
        //     state.isFetching = false
        //     state.newsData = news
        //         .filter((value, index, self) =>             // and after concat we make this array like a set, u n i q u e
        //             self.findIndex(v => v.id === value.id) === index)
        //     console.log(current(state))
        // },
        unsetNewsData: state => {
            state.newsData = []
        }
    },
    extraReducers: {

        [fetchNews.fulfilled]: (state, action) => {
            console.log("now.. WHERE THE FUCK IS MY STATE????")
            let news = state.newsData !== undefined ? [...state.newsData, ...action.payload] : action.payload
            state.newsData = news
                .filter((value, index, self) =>             // and after concat we make this array like a set, u n i q u e
                    self.findIndex(v => v.id === value.id) === index)
        },
    }

})
//
// export const selectIsFetching = state => state.isFetching
// export const selectIsErrored = state => state.isErrored
export const selectNewsData = state => state.newsData
export const selectCurrentPage = state => state.currentPage

export const {unsetNewsData, incrementPage, restoreNewsState} = newsSlice.actions

export default newsSlice.reducer
