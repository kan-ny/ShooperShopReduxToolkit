import { createSlice } from '@reduxjs/toolkit'; 




export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategory (state, action){
      state.categories = action.payload;
    }
  }
});


export const { setCategory } = categorySlice.actions;
export const categoriesReducer = categorySlice.reducer;



// import { CATEGORIES_ACTION_TYPES } from './category.types';


// export const categoriesReducer = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
//       return { ...state, categories: payload };
//     default:
//       return state;
//   }
// };


