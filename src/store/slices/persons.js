//בס"ד

import { createSlice } from "@reduxjs/toolkit"
import { getAllPersonsThunk} from "../thunks/person/getAllPersons.js"
import { getPersonByIdThunk } from "../thunks/person/getPersonById.js"
import { getOffersForPersonThunk } from "../thunks/currUser/getAllOffer.js";
import { removeOfferThunk } from "../thunks/offers/removeOffer.js";
import { addPersonThunk } from "../thunks/person/addPerson.js";
import { addOfferThunk} from "../thunks/offers/addOffer.js";
import { iSeeCancelThunk } from "../thunks/person/personOffers/iSeeCancel.js";
import { iRefuseThunk } from "../thunks/person/personOffers/iRefuse.js";
import { yesIWantThunk } from "../thunks/person/personOffers/yesIWant.js";
import { sendToSubmitThunk } from "../thunks/offers/sendToSubmit.js";

const INITIAL_STATE_PERSOS = {
    // newPerson: {
    //     Pid : '',
    //     BDate : new Date(),
    //     MaleOrFemale : 0,
    //     Migzar : '',
    //     LastName : '',
    //     FirstName: '',
    //     City : '',
    //     Phone : '',
    //     Email : ''
    // },
    user: null,
    personsArr: [],
    userOff:[],
    userNewOtherOffer:[],
    userCancels:[],
    newUser: false,
    flag:[]
}

export const personsSlice = createSlice({
    name: 'persons',
    initialState: INITIAL_STATE_PERSOS,
    reducers: {
        // addPerson : (state, action) =>{
        //     state.personsArr.push(action.payload)
        // },
        // setNewUser : (state, action) =>{
        //     state.newUser = action.payload
        // }
        // getById : (state,action) =>{
        //     debugger
        //     return "aaa";//state.personsArr.find(p=>p.pid==action.payload)
        // },

        addOffer : (state, action) =>{
            debugger
            let x = action.payload
            state.userOff.push(x)
        },
        updateZivuginOffer : (state, action) =>{
            debugger
            let ind = state.userOff.findIndex(o => o.offerId == action.payload[0])
            state.userOff[ind].zivug = 1
            // ind = state.userOff.findIndex(o => o.offerId == action.payload[1])
            // state.userOff[ind].zivug = action.payload[0]           
        },
        delOffer : (state, action) =>{
            let ind = state.userOff.findIndex(o => o.offerId == action.payload)
            if(ind!=-1)
            state.userOff.splice(ind,1)

            ind = state.userCancels.findIndex(o => o.offerId == action.payload)
            if(ind!=-1)
            state.userCancels.splice(ind,1)

            ind = state.userNewOtherOffer.findIndex(o => o.offerId == action.payload)
            if(ind!=-1)
            state.userNewOtherOffer.splice(ind,1)

           // state.userOff = action.payload
        },
        delOfferBecPS : (state, action) =>{
            debugger
            let ind = state.userOff.findIndex(o => o.offerId == action.payload[0])
            if(ind!=-1)
            state.userOff.splice(ind,1)

            ind = state.userCancels.findIndex(o => o.offerId == action.payload[0])
            if(ind!=-1)
            state.userCancels.splice(ind,1)

            ind = state.userNewOtherOffer.findIndex(o => o.offerId == action.payload[0])
            if(ind!=-1)
            state.userNewOtherOffer.splice(ind,1)

           // state.userOff = action.payload
        },
        delCanceldOffer : (state, action) =>{
             
            if(action.payload!=-1){
              let ind = state.userOff.findIndex(o => o.offerId == action.payload)
              state.userOff[ind].zivug = 0
            
              ind = state.userCancels.findIndex(o => o.offerId == action.payload)
              state.userCancels.splice(ind,1)
        }

    }
    },

    extraReducers: (builder) => {
        
        builder.addCase(getAllPersonsThunk.fulfilled, (state,action)=>{
            debugger
            state.personsArr = action.payload;
         });

         builder.addCase(addPersonThunk.fulfilled, (state,action)=>{
            state.newUser = 2;
         });

       

        builder.addCase(iSeeCancelThunk.fulfilled, (state, action) => {
            personsSlice.caseReducers.delCanceldOffer(state, action);
          });

         builder.addCase(addOfferThunk.fulfilled, (state,action)=>{
            personsSlice.caseReducers.addOffer(state, action);
         });

        //  builder.addCase(removeOfferThunk.fulfilled, (state,action)=>{
        //     state.personsArr = action.payload;
        //  });

        builder.addCase(getPersonByIdThunk.fulfilled,(state,action)=>{
            debugger
            if(action.payload.user == null)
                state.newUser = true;
            else
                state.newUser = false;

            state.user = action.payload.user;
            state.userOff = action.payload.offers

            if(state.userOff && state.userOff.length>0)
             for (let i = 0; i < state.userOff.length; i++) {
                debugger
                if(state.userOff[i].zivug==10){
                    console.log('wow!');
                   state.userCancels.push(state.userOff[i])
                }
                else if(state.userOff[i].zivug<0 || state.userOff[i].zivug==200)
                   state.userNewOtherOffer.push(state.userOff[i])
            }
        });

        builder.addCase(iRefuseThunk.fulfilled,(state,action)=>{
                 
            if(action.payload!=-1){
                debugger
                let ind = state.userOff.findIndex(o => o.offerId == action.payload)
                state.userOff[ind].zivug = 0
              
                ind = state.userNewOtherOffer.findIndex(o => o.offerId == action.payload)
                state.userNewOtherOffer.splice(ind,1)
          }

            });

            builder.addCase(yesIWantThunk.fulfilled, (state,action)=>{
                if(action.payload[1]!=null)
                   //action.payload = action.payload[0];
                   personsSlice.caseReducers.delOfferBecPS(state, action);
             });

             builder.addCase(sendToSubmitThunk.fulfilled, (state, action) => {
                personsSlice.caseReducers.updateZivuginOffer(state, action);
             });

             builder.addCase(removeOfferThunk.fulfilled, (state, action) => {
                personsSlice.caseReducers.delOffer(state, action);
             })
    
        

        // builder.addCase(getOffersForPersonThunk.fulfilled,(state,action)=>{
        //     debugger
        //     if(action.payload!=null)
        //         state.userOff = action.payload;
        // })

    }

});

