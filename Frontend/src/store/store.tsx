import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import vacationReducer from "../slices/vacationSlice";
import uiReducer from "../slices/uiSlice";
import authReducer from "../slices/authSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        vacation: vacationReducer,
        ui: uiReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
