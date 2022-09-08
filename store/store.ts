import { createWrapper } from "next-redux-wrapper";
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from "./tasks";
const makeStore = () =>
  configureStore({
    reducer: {
      data:dataReducer
    },
  });
export const wrapper = createWrapper(makeStore);
