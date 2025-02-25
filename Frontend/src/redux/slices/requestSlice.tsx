import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface VacationRequest {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  comments?: string;
}

interface RequestState {
  requests: VacationRequest[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: RequestState = {
  requests: [],
  loading: false,
  error: null,
};

// Fetch requests for requester
export const fetchUserRequests = createAsyncThunk(
  "requests/fetchUserRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/vacations/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch requests");
    }
  }
);

// Fetch all requests (for validators)
export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/vacations/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch all requests");
    }
  }
);

// Create a vacation request
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (requestData: { start_date: string; end_date: string; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/vacations/", requestData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create request");
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default requestSlice.reducer;
