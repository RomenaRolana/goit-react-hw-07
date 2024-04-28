import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "../redux/contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import {
  selectError,
  selectLoading,
  selectContacts,
  selectFilter,
} from "./selectors";

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

// Мемоізований селектор для фільтрації контактів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filters) => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filters.toLowerCase());
    });
  }
);

export const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts", // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE, // Об'єкт редюсерів
  // Додаємо обробку зовнішніх екшенів
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
