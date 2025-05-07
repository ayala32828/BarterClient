////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPersonsThunk = createAsyncThunk(
  'getAllPersons',
  async () => {
    debugger
    const response = await fetch('https://localhost:7174/controller/Persons/GetAllPersons');
    if (response.ok) {
      const data = await response.json()
      console.log(data);
      return data;
    }
    else {
      console.log("sorry...GetAllPersons");
    }

  }
)


