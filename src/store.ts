import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './slices/builderSlice';
import formsReducer from './slices/formsSlice';

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
