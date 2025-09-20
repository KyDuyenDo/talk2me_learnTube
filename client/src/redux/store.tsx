import { configureStore } from "@reduxjs/toolkit"
import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.PROD === false, // Enable Redux DevTools in development mode
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch