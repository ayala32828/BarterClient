////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllOffersThunk = createAsyncThunk(
  'getAllOffers',
  async () => {
    
    const response = await fetch('https://localhost:7174/controller/Offers/GetAllOffers');
    debugger
    if (response.ok) {
      
      const data = await response.json()
      console.log(data);
      return data;
    }
    else {
      console.log("sorry...GetAllOffers");
    }

  }
)


