////בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPSThunk = createAsyncThunk(
  'getPSThunk',
  async () => {
    const response = await fetch('https://localhost:7174/controller/OfferInUsed/GetAllOffersInUsed');
    if (response.ok) {
      const data = await response.json()
      return data;
    }
    else {
      alert("ההצעות בשימוש - החברותות לא הגיעו טוב");
    }

  }
)


