import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchData, FetchTimeRule } from '../api/amitaApi';

export const getData = createAsyncThunk('', async () => {
  let response = await FetchData();
  return response;
});
export const getTimeRule = createAsyncThunk('', async () => {
  console.log('tetet');
  let response = await FetchTimeRule();
  return response;
});
