import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

interface User {
  id: number;
  username: string;
  role: "REQUESTER" | "VALIDATOR";
  token: string; // Ensure token is part of the user object
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Retrieve stored user data from localStorage
const storedUser = localStorage.getItem("user");
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

console.log("🔍 Initial user from localStorage:", parsedUser);

const initialState: AuthState = {
  user: parsedUser,
  token: parsedUser?.token || null, // Retrieve token from user object
  loading: false,
  error: null,
};

// Thunk to handle login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    console.log("📢 Attempting login for:", username);

    try {
      const response = await api.post("/users/login", { username, password });
      console.log("✅ Login response:", response.data);

      const { token, user } = response.data;
      const userWithToken = { ...user, token }; // Attach token to user object

      // Store user and token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithToken));

      console.log("💾 User stored in localStorage:", userWithToken);
      return userWithToken;
    } catch (error: any) {
      console.error("❌ Login failed:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout action
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Ensure both are cleared on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
