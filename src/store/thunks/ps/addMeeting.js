////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const addMeetingThunk = createAsyncThunk(
    'addMeetingThunk',
    async (meeting) => {
        debugger
        const response = await fetch(`https://localhost:7174/controller/Meetings/Add`,
            {
                method: 'POST',
                body: JSON.stringify(meeting),
                headers: {
                    'Content-type': 'application/json'
                }
            });
        if (response.ok) {
            const data = await response.json()
              //////////////////////////data.
              meeting.meetingId = data;
            return meeting;
        }
        else {
            alert("sorry...");
        }

    }
)


