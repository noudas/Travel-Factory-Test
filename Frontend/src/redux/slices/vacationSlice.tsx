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

// ✅ Create request (async)
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (requestData: Omit<VacationRequest, "id" | "status">, { rejectWithValue }) => {
    try {
      const response = await api.post("/vacation-requests", requestData); // ✅ Check if backend route is correct
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create request");
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
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRequests } = requestSlice.actions;
export default requestSlice.reducer;
