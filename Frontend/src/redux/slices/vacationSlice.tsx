import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface VacationRequest {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comments?: string;
}

interface VacationState {
  requests: VacationRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: VacationState = {
  requests: [],
  loading: false,
  error: null,
};

// ✅ Fetch all requests (GET)
export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vacations");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch requests");
    }
  }
);

// ✅ Approve request (PUT)
export const approveRequest = createAsyncThunk(
  "requests/approveRequest",
  async (requestId: number, { dispatch, rejectWithValue }) => {
    try {
      await api.put(`/vacations/${requestId}/approve`);
      dispatch(fetchAllRequests()); // Refresh requests after approval
      return requestId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to approve request");
    }
  }
);

// ✅ Reject request (PUT)
export const rejectRequest = createAsyncThunk(
  "requests/rejectRequest",
  async (requestId: number, { dispatch, rejectWithValue }) => {
    try {
      await api.put(`/vacations/${requestId}/reject`);
      dispatch(fetchAllRequests()); // Refresh requests after rejection
      return requestId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to reject request");
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<VacationRequest[]>) => {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload);
        if (index !== -1) {
          state.requests[index].status = "APPROVED";
        }
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload);
        if (index !== -1) {
          state.requests[index].status = "REJECTED";
        }
      });
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;
