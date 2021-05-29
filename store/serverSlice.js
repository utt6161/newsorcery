import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import {ParsedUrlQuery} from 'querystring';
/* eslint-disable no-param-reassign */

const serverSlice = createSlice({
    name: 'server',
    initialState: {pathName: '', query: {}},
    reducers: {
        setPathAndQuery(state, action) {
            state.pathName = action.payload.pathName ?? state.pathName;
            state.query = action.payload.query ?? state.query;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            HYDRATE,
            (_, action) => {
                return action.payload.server;
            }
        );
    },
});

export default serverSlice.reducer;
export {HYDRATE};
export const {setPathAndQuery} = serverSlice.actions;
