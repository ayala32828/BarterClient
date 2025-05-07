////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeOfferThunk = createAsyncThunk(
    'removeOfferThunk',
    async (id) => {
        debugger
        const response = await fetch(`https://localhost:7174/controller/Offers/Delete/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json()          
            alert(data);
            return id;
        }
        else {
            alert("sorry...");
        }

    }
)


