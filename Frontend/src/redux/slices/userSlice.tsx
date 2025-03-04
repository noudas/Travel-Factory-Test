import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  username: string | null;
  token: string | null;
  role: "REQUESTER" | "VALIDATOR" | null;
}

const storedUser = localStorage.getItem("user");
const initialState: UserState = storedUser
                  ? JSON.parse(storedUser)
                  : { id: null, username: null, token: null, role: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.token = action.payload.token; // store token in redux state
      state.role = action.payload.role;

      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user data including token
      localStorage.setItem("token", action.payload.token || ""); // Store token separately
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.token = null;
      state.role = null;
      
      localStorage.removeItem("user"); // Clear user data
      localStorage.removeItem("token"); // Remove token
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
