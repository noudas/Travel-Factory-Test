import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string | null;
    username: string | null;
    role: "REQUESTER" | "VALIDATOR" | null;
}

const initialState: UserState = {
    id: null,
    username: null,
    role: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.role = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
