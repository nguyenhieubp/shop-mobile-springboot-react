import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/contacts",
        contact
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/contacts/${contactId}`
      );
      console.log(response.data);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const contactId = action.payload;
        state.contacts = state.contacts.filter(
          (contact) => contact.id != contactId
        );
      });
  },
});

export default contactSlice.reducer;
