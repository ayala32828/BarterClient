//בס"ד

import { createSlice } from "@reduxjs/toolkit"
import { getOptionsThunk } from "../thunks/options/getOptions";


const INITIAL_STATE_OPTIONS = {
   optionArr : null 
 
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState: INITIAL_STATE_OPTIONS,
    reducers: {
        getById : (state,action) =>{
            return state.optionArr.find(o=>o.opId==action.payload)
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getOptionsThunk.fulfilled, (state,action)=>{
            state.optionArr = action.payload;
         });
        
     }
});

