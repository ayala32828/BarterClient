////בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPSByPIdThunk = createAsyncThunk(
  'getPSByPIdThunk',
  async (id) => {
    debugger
    let data = [null,null]
    const response = await fetch(`https://localhost:7174/controller/OfferInUsed/GetByPId/${id}`);
    if (response.ok)
         data[0] = await response.json()
    
    const response2 = await fetch(`https://localhost:7174/controller/Meetings/GetByPId/${id}`);      
    if(response2.ok)
        data[1] = await response2.json()
     console.log(data[1]);
        
    return data;
   
    }
    // else {
      
    //   alert("ההצעות בשימוש -או התיעודים החברותות שלי לא הגיעו טוב");
    // }
// ==================================================
  
)


