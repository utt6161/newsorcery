import { createSlice } from '@reduxjs/toolkit';

export const sectionSlice = createSlice({
    name: 'section',
    initialState: {
        // sectionSelected: false,
        sectionInfo: {
            sectionId: "",
            sectionText: ""
        }
    },
    reducers: {
        setSelected: (state, action) => {
            if(action.payload.sectionId !== "" && action.payload.sectionText !== "") {
                state.sectionSelected = true;
                state.sectionInfo = action.payload;
            }
            //console.log(action.payload);
            //console.log('setSelected fired');
        },
        setUnselected: (state) => {
            state.sectionSelected = false;
            state.sectionInfo = {
                sectionId: '',
                sectionText: '',
            };
        },

    },
});

export const selectSectionInfo = (state) => state.section.sectionInfo;
export const selectSectionSelected = (state) => state.section.sectionSelected;

export const { setSelected, setUnselected } = sectionSlice.actions;

export default sectionSlice.reducer;
