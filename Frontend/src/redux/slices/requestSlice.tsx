import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

interface VacationRequest {
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  comments?: string;
}

interface RequestState {
  requests: VacationRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: RequestState = {
  requests: [], // Ensure requests is always an array
  loading: false,
  error: null,
};

// Fetch requests for a specific user
export const fetchUserRequests = createAsyncThunk(
  "requests/fetchUserRequests",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/vacations/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("API Response:", response.data); // Debugging log
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user requests:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user requests");
    }
  }
);


// Fetch all requests (Admin or HR)
export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vacations/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch all requests");
    }
  }
);

// Create a vacation request
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (requestData: { startDate: string; endDate: string; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/vacations/", requestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
      // Fetch user requests
      .addCase(fetchUserRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        console.log("🚀 Fetched Requests Data:", action.payload); // Debug log
        state.requests = Array.isArray(action.payload.data) ? action.payload.data : [];
      })
      
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch all requests
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create request
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests ? [...state.requests, action.payload] : [action.payload];
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default requestSlice.reducer;
