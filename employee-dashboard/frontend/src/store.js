import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api' });

export const fetchEmployees = createAsyncThunk('employees/fetch', async (params) => {
  const res = await API.get('/employees', { params });
  return res.data.employees;
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => { state.status = 'loading'; });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; });
    builder.addCase(fetchEmployees.rejected, (state) => { state.status = 'failed'; });
  }
});

const store = configureStore({ reducer: { employees: employeesSlice.reducer } });
export default store;
