////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const iSeeCancelThunk = createAsyncThunk(
    'iSeeCancelThunk',
    async (id) => {
        
        const response = await fetch(`https://localhost:7174/controller/Offers/iSeeCancel/${id}`,
            {
                method: 'put',
                //body: JSON.stringify(person),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            debugger
        if (response.ok) {

            const data = await response.json()
            if(data == true) return id     
            return -1;
        }
        else {
            alert("sorry...iSeeCancelThunk");
        }

    }
)


