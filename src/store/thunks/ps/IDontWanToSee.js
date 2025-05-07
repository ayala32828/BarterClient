////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const IDontWanToSeeThunk = createAsyncThunk(
    'IDontWanToSeeThunk',
    async (id) => {
        
        const response = await fetch(`https://localhost:7174/controller/OfferInUsed/IDontWantToSee/${id}`,
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
            return 0;
        }
        else {
            alert("sorry...IDontWanToSee");
        }

    }
)


