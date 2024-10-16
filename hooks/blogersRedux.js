import { createSlice } from '@reduxjs/toolkit';

const blogersSlice = createSlice({
  name: 'blogers',
  initialState: {
    bloggers: []
  },
  reducers: {
    setbloggers: (state, action) => {
      state.bloggers = action.payload;
    }
    
  },
});

export const { setbloggers } = blogersSlice.actions;
export default blogersSlice.reducer;
