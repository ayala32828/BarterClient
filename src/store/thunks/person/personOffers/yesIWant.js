////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const yesIWantThunk = createAsyncThunk(
  'yesIWantThunk',
  async (id) => {
    debugger
    const response = await fetch(`https://localhost:7174/controller/Offers/MoveToInUsedOffers/${id}`);
    if (response.ok) {
      const data = await response.json()
      let help = [id,data]
      return help;
    }
    else {
      console.log("sorry...iRefuseThunk");
    }

  }
)


