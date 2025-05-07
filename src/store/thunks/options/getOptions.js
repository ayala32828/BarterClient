////בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOptionsThunk = createAsyncThunk(
  'getOptionsThunk',
  async () => {
    const response = await fetch('https://localhost:7174/controller/Options/GetAllOptions');
    if (response.ok) {
      const data = await response.json()
      return data;
    }
    else {
      alert("האופציות לא הגיעו טוב");
    }

  }
)


