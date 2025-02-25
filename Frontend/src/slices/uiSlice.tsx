import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: UIState = {
    loading: false,
    error: null,
    successMessage: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setSuccessMessage: (state, action: PayloadAction<string | null>) => {
            state.successMessage = action.payload;
        },
    },
});

export const { setLoading, setError, setSuccessMessage } = uiSlice.actions;
export default uiSlice.reducer;
