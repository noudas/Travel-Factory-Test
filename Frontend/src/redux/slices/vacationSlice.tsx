import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: VacationState = {
    requests: [],
};

const vacationSlice = createSlice({
    name: "vacation",
    initialState,
    reducers: {
        setRequests: (state, action: PayloadAction<VacationRequest[]>) => {
            state.requests = action.payload;
        },
        addRequest: (state, action: PayloadAction<VacationRequest>) => {
            state.requests.push(action.payload);
        },
        updateRequestStatus: (
            state,
            action: PayloadAction<{ id: string; status: "APPROVED" | "REJECTED"; comments?: string }>
        ) => {
            const request = state.requests.find(req => req.id === action.payload.id);
            if (request) {
                request.status = action.payload.status;
                if (action.payload.comments) {
                    request.comments = action.payload.comments;
                }
            }
        },
    },
});

export const { setRequests, addRequest, updateRequestStatus } = vacationSlice.actions;
export default vacationSlice.reducer;
