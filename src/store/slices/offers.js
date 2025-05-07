//בס"ד

import { createSlice } from "@reduxjs/toolkit"
import { getAllOffersThunk } from "../thunks/offers/getAllOffers";
import { sendToSubmitThunk } from "../thunks/offers/sendToSubmit";
import { addOfferThunk} from "../thunks/offers/addOffer";
import { removeOfferThunk } from "../thunks/offers/removeOffer";
const INITIAL_STATE_OFFERS = {
    offersArr: [],
    oralOfferArr: [],
    //דגל שעוזר למי שמבקש ראשון חברותא
    canUpdateZivuginOffer: false
}

export const offersSlice = createSlice({
    name: 'offers',
    initialState: INITIAL_STATE_OFFERS,
    reducers: {
        addOffer: (state, action) => {
            debugger
            state.offersArr.push(action.payload)
            state.oralOfferArr.push(action.payload)
            //state.canUpdateZivuginOffer = true
        },
        delOffer: (state, action) => {
            let ind = state.offersArr.findIndex(o => o.offerId == action.payload)
            if(ind!=-1)
            state.offersArr.splice(ind,1)
            ind = state.oralOfferArr.findIndex(o => o.offerId == action.payload)
            if(ind!=-1)
            state.oralOfferArr.splice(ind,1)

        },
        updateZivuginOffer : (state, action) =>{
            debugger
            let ind = state.offersArr.findIndex(o => o.offerId == action.payload[1])
            if(ind!=-1)
            state.offersArr[ind].zivug = action.payload[0]
            ind = state.oralOfferArr.findIndex(o => o.offerId == action.payload[1])
            if(ind!=-1)
            state.oralOfferArr[ind].zivug = action.payload[0]            
        },
        setnewOffers: (state, action) => {
            state.newOffers = action.payload
        },
        getPidByOffId: (state, action) => {
            debugger
          return state.offersArr.find(o=>o.offerId==action.payload.offerId).myId
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllOffersThunk.fulfilled, (state, action) => {
            state.oralOfferArr = action.payload;
            if (state.oralOfferArr && state.oralOfferArr.length > 0)
                for (let i = 0; i < state.oralOfferArr.length; i++) {
                    if (state.oralOfferArr[i].zivug != 1 && state.oralOfferArr[i].zivug >= 0)
                        state.offersArr.push(state.oralOfferArr[i])
                   
            }
        });

        builder.addCase(sendToSubmitThunk.fulfilled, (state, action) => {
            offersSlice.caseReducers.updateZivuginOffer(state, action);
         });

         builder.addCase(addOfferThunk.fulfilled, (state,action)=>{
            offersSlice.caseReducers.addOffer(state, action);

         });

         builder.addCase(removeOfferThunk.fulfilled, (state,action)=>{
            offersSlice.caseReducers.delOffer(state, action);
         });



        // builder.addCase(getOffersByIdThunk.fulfilled, (state, action) => {
        //     debugger
        //     if (action.payload.user == null)
        //         state.newOffers = true;

        //     state.user = action.payload.user;
        //     state.userOff = action.payload.offers
        // });

    }

});

