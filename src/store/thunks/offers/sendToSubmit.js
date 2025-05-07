////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendToSubmitThunk = createAsyncThunk(
  'sendToSubmitThunk',
  async ({id1,id2}) => {
    debugger
    const response = await fetch(`https://localhost:7174/controller/Offers/SendToSubmit/${id1}/${id2}`);
    
    if (response.ok) {     
      const data = await response.json()
      if(data == false)
      console.log("sorry...sendToSubmitThunk");
      else
        return [id1,id2];
    }
    else {
      console.log("sorry...sendToSubmitThunk");
    }

  }
)


