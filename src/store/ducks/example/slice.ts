import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';

export interface IExampleStore {
  example?: boolean;
}

const initialState = {
  example: false,
} as IExampleStore;

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setMyExample: (state: IExampleStore, actions: PayloadAction<boolean>) => {
      return {
        ...state,
        example: !state.example,
      };
    },
  },
});

export const { setMyExample } = exampleSlice.actions;

export const getExample = (state: RootState) => state.example.example;

export default exampleSlice.reducer;
