import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface VacationRequest {
  id: string;
  userId: string;
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

// ✅ Approve request (PUT)
export const approveRequest = createAsyncThunk(
  "requests/approveRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/vacations/${requestId}/approve`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to approve request");
    }
  }
);

// ✅ Reject request (PUT)
export const rejectRequest = createAsyncThunk(
  "requests/rejectRequest",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/vacations/${requestId}/reject`);
      return response.data;
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
      .addCase(approveRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index].status = "APPROVED";
        }
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index].status = "REJECTED";
        }
      });
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;
