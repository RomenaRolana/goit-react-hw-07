import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  name: "",
};

export const filtersSlice = createSlice({
  // Ім'я слайсу
  name: "contacts", // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE, // Об'єкт редюсерів
  reducers: {
    setFilter(state, action) {
      state.name = action.payload;
    },
  },
});


export const { setFilter } = filtersSlice.actions;


export const filtersReducer = filtersSlice.reducer;


