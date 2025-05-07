////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOffersForPersonThunk = createAsyncThunk(
    'GetOffersForPersonThunk',
    async (id) => {
        debugger
        
        const response = await fetch(`https://localhost:7174/controller/Persons/GetOffersForPerson/${id}`);
        if (response.ok) {
            // if(response.status == 204)
            //     return null;
            const data = await response.json()                      
            console.log(data);
            return data;
        }
        else {
           console.log("sorry...");
        }

    }
)


