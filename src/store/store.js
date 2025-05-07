//בס"ד

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { personsSlice } from "./slices/persons";
import { optionsSlice } from "./slices/options";
import { offersSlice } from "./slices/offers";
import { partnerShipsSlice } from "./slices/partnerShips";

const reducer = combineSlices(personsSlice,optionsSlice,offersSlice,partnerShipsSlice);

export const STORE = configureStore({
    reducer: reducer
})

STORE.getState()
