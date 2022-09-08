import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: []
  },
  reducers: {
    addData: (state, action) => {
      let max=Math.max(...(state.value.map(x=>  x.id)))
      state.value=[...state.value, {
        id:max+1,
        name:action.payload.name , 
        priority:action.payload.priority
      }]
    },
    setData: (state, action) => {
        state.value = action.payload;
    },
    editData:(state, action) => {
      state.value=state.value.map(x=> {
        if(x.id==action.payload.id)
          x.priority=action.payload.priority
        return x;
      })
    },
    deleteData:(state, action) => {
      state.value=state.value.filter(x=> x.id!=action.payload  );
    },
  },
})

export const { addData,setData,editData,deleteData } = dataSlice.actions

export default dataSlice.reducer