////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const iRefuseThunk = createAsyncThunk(
  'iRefuseThunk',
  async (id) => {
    debugger
    const response = await fetch(`https://localhost:7174/controller/Offers/Cancel/${id}`);
    if (response.ok) {
      const data = await response.json()
      return data?id:-1;
    }
    else {
      console.log("sorry...iRefuseThunk");
    }

  }
)


