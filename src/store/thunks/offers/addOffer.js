////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOffersThunk } from "./getAllOffers";

export const addOfferThunk = createAsyncThunk(
    'addOfferThunk',
    async (offer) => {
        debugger
        const response = await fetch(`https://localhost:7174/controller/Offers/Add`,
            {
                method: 'POST',
                body: JSON.stringify(offer),
                headers: {
                    'Content-type': 'application/json'
                }
            });
        if (response.ok) {
            const data = await response.json()   
            offer.offerId = data       
            return offer;
        }
        else {
            alert("sorry...");
        }

    }
)


