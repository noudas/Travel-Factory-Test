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

// Initial state
const initialState: RequestState = {
  requests: [],
  loading: false,
  error: null,
};

// Fetch user-specific requests
export const fetchUserRequests = createAsyncThunk(
  "requests/fetchUserRequests",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📡 Fetching user requests...");
      const response = await api.get("/vacations/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("✅ User requests fetched:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to fetch user requests:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch requests");
    }
  }
);

// Fetch all requests (for validators)
export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📡 Fetching all requests...");
      const response = await api.get("/vacations/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("✅ All requests fetched:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to fetch all requests:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch all requests");
    }
  }
);

// Create a vacation request
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (requestData: { startDate: string; endDate: string; reason?: string }, { rejectWithValue }) => {
    try {
      console.log("📤 Sending request data:", requestData);
      const response = await api.post("/vacations/", requestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("✅ Request created:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Failed to create request:", error.response?.data || error.message);
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
      // Fetch User Requests
      .addCase(fetchUserRequests.pending, (state) => {
        console.log("⏳ Fetching user requests...");
        state.loading = true;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        console.log("✅ User requests fetched successfully:", action.payload);
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        console.error("❌ Failed to fetch user requests:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Requests
      .addCase(fetchAllRequests.pending, (state) => {
        console.log("⏳ Fetching all requests...");
        state.loading = true;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        console.log("✅ All requests fetched successfully:", action.payload);
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        console.error("❌ Failed to fetch all requests:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Request
      .addCase(createRequest.pending, (state) => {
        console.log("⏳ Creating new vacation request...");
        state.loading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        console.log("✅ Request created successfully:", action.payload);
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        console.error("❌ Failed to create vacation request:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default requestSlice.reducer;
