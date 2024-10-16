import { createSlice } from '@reduxjs/toolkit';

const catSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: []
  },
  reducers: {
    setcategories: (state, action) => {
      state.categories = action.payload;
    }
    
  },
});

export const { setcategories } = catSlice.actions;
export default catSlice.reducer;
