import { createSlice } from '@reduxjs/toolkit';

const FilterSlice = createSlice({
  name: 'filter',
  initialState: {
    cuntry: '',
    age:'',
    type:'',
    lowerPrice:'',
    higherPrice:''
  },
  reducers: {
    setcuntry: (state, action) => {
      state.cuntry = action.payload;
    },
    setAge: (state, action) => {
        state.age = action.payload;
      },    
      setType: (state, action) => {
        state.type = action.payload;
      },   
       setPrice: (state, action) => {
        state.price = action.payload;
      },
       setlowerPrice: (state, action) => {
        state.lowerPrice = action.payload;
      },
      setHeighererPrice: (state, action) => {
        state.higherPrice = action.payload;
      },
    
  },
});

export const { setAge,setType,setcuntry,setPrice,setlowerPrice,setHeighererPrice } = FilterSlice.actions;
export default FilterSlice.reducer;
