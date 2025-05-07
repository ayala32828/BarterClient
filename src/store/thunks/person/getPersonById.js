////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getOffersForPersonThunk } from "../currUser/getAllOffer";

export const getPersonByIdThunk = createAsyncThunk(
    'getPersonByIdThunk',
    async (id) => {
        debugger
        let allRes = {}
        const response = await fetch(`https://localhost:7174/controller/Persons/GetById/${id}`);
        if (response.ok) {
            if (response.status == 204)
                allRes.user = null;
            else {
                const data = await response.json()
                allRes.user = data;
            }


            ///////////
            const response2 = await fetch(`https://localhost:7174/controller/Persons/GetOffersForPerson/${id}`);
            if (response2.ok) {
             if(response2.status == 204)
                allRes.offers = [];
             else{
                debugger
                const dataOff = await response2.json()                      
                //console.log(data);
                allRes.offers = dataOff
            }
        }
        else {
           console.log("sorry...");
        }




            // const off = await getOffersForPersonThunk(id);
            // if (off != null)
            //     allRes.offers = off;
            // else
            //    allRes.offers = [];


            return allRes;
        }

        else {
            console.log("sorry...");
        }

    }
)


