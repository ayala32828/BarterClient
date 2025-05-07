//בס"ד
import { createSlice } from "@reduxjs/toolkit"
import { getPSByPIdThunk } from '../thunks/ps/getPSByPId'
import { personsSlice } from "./persons";
import { optionsSlice } from "./options";
import { offersSlice } from "./offers";
import { addMeetingThunk } from "../thunks/ps/addMeeting";
import { IDontWanToSeeThunk } from "../thunks/ps/IDontWanToSee";
import { yesIWantThunk } from "../thunks/person/personOffers/yesIWant";


const INITIAL_STATE_PS = {
    psArr: [],
    //psId
    //psArr:
    //psName
    //pName
    //phone
    //mail
    //details
    //history arr
    //hidden
    myPsArr: [],
    Documentation:[],
    fillDecFlag:false

}
export const partnerShipsSlice = createSlice({
    name: 'ps',
    initialState: INITIAL_STATE_PS,
    reducers: {
        initialization : (state,action) =>{
            state.myPsArr = action.payload
        },
        addPS : (state,action) =>{
            state.myPsArr.push(action.payload)
            state.psArr.push(action.payload)
            state.fillDecFlag = false
        },
        addPS2 : (state,action) =>{
            state.myPsArr.push(action.payload[1])
            state.psArr.push(action.payload[1])
            state.fillDecFlag = false
        },
        iFillDec : (state,action) =>{
            state.fillDecFlag = true
        },
        
        addMeet : (state,action) =>{
            let me = action.payload
            let ind = state.myPsArr.findIndex(o=>me.offInUsedId == o.psId);
            debugger
            state.myPsArr[ind].historyArr.push(me)

        },

        dontSee : (state,action) =>{
            let me = action.payload
            let ind = state.myPsArr.findIndex(o=>me == o.psId);
            state.myPsArr[ind].hidden=false

        }

    },

    extraReducers: (builder) => {
        builder.addCase(getPSByPIdThunk.fulfilled, (state, action) => {
            //let y = arr.map(p=>{return{a:p.id,b:p.name,c:1}})
           // let arr = action.payload;
            // state.myPsArr = arr.map(ps => {
            //     // debugger
            //     // action.payload = ps;
            //     // let partnerId = offersSlice.caseReducers.getPidByOffId(state,action)
            //     // action.payload = partnerId
            //     // let pId = personsSlice.caseReducers.getById(state,action);
            //     // debugger
            //     //נא לבדוק איך לעשות זאת נכון
            //     //let op1 = optionsSlice.caseReducers.getById(state,ps.iwant);
            //     //let op2 = optionsSlice.caseReducers.getById(state,ps.icanGive);

            //     return {
            //           psId:ps.usedId,
            //           psName:'op1+" "+op2',
            //           pName:"שם שותף",
            //           phone:"שם",
            //           mail:"מיל",
            //           details:"פרטים",
            //           hidden:false,
            //           historyArr:[]
            //     }

            // })
                debugger
                if(action.payload[0]!=null)
                   state.myPsArr = action.payload[0];
                if(action.payload[1]!=null)
                  state.Documentation = action.payload[1];
        });
        builder.addCase(addMeetingThunk.fulfilled, (state, action) => {
            partnerShipsSlice.caseReducers.addMeet(state, action);
        })

        builder.addCase(IDontWanToSeeThunk.fulfilled, (state, action) => {
            partnerShipsSlice.caseReducers.dontSee(state, action);
        })

        builder.addCase(yesIWantThunk.fulfilled, (state, action) => {
            if(action.payload[1]!=null){
            //action.payload = action.payload[1]
            partnerShipsSlice.caseReducers.addPS2(state, action);
        }
        })

    }
});

