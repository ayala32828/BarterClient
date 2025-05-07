////בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPersonsThunk } from "./getAllPersons";

export const addPersonThunk = createAsyncThunk(
    'addPersonThunk',
    async (person) => {
        debugger
        const response = await fetch(`https://localhost:7174/controller/Persons/Add`,
            {
                method: 'POST',
                body: JSON.stringify(person),
                headers: {
                    'Content-type': 'application/json'
                }
            });
        if (response.ok) {
            const data = await response.json()          
            return data;
        }
        else {
            alert("sorry...");
        }

    }
)


