import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit'
import axios from "axios";
import {newsAPI} from "./crucialData";

export const fetchArticles = createAsyncThunk(
    'users/fetchArticles',
    async (paramObj, thunkAPI) => {
        const assebledURL = `${newsAPI}${paramObj.searchText && paramObj.searchText !== "undefined" ? ("&q=" + paramObj.searchText) : ""}&page=${paramObj.currentPage ? paramObj.currentPage : 1}${paramObj.sectionInfo.sectionId ? `&section=${paramObj.sectionInfo.sectionId}` : ''}`
        //console.log(assebledURL)
        const response = await axios.get(assebledURL)
        return response.data.response
    })

export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        isErrored: false,
        isFetching: false,
        articlesData: [],
        currentPage: 1,
    },
    reducers: {

        setCurrentPage: (state, action) =>{
            state.currentPage = action.payload
        },

        incrementPage: (state) => {
            //console.log("attempting to increment the page")
            if(state.currentPage < state.totalPages) {
                state.currentPage++
            } else {
                //console.log("we have hit the bottom, what can i say")
            }
        },

        restoreArticlesState: state => {
            //console.log("restoring articles state")
            state.currentPage = 1
            state.articlesData = []
            state.totalPages = undefined
        },

    },
    extraReducers: {
        [fetchArticles.fulfilled]: (state, action) => {
            let articles = state.articlesData !== undefined ? [...state.articlesData
                , ...action.payload.results] : action.payload.results
            state.totalPages = action.payload.pages
            state.articlesData = articles
                .filter((value, index, self) =>             // and after concat we make this array like a set, u n i q u e
                    self.findIndex(v => v.id === value.id) === index)
        },
    }

})
//
// export const selectIsFetching = state => state.isFetching
// export const selectIsErrored = state => state.isErrored
export const selectArticlesData = state => state.articlesData
export const selectCurrentPage = state => state.currentPage
export const selectTotalPages = state => state.totalPages

export const {unsetArticlesData, incrementPage, restoreArticlesState, setCurrentPage} = articlesSlice.actions

export default articlesSlice.reducer
