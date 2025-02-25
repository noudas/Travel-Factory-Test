import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import vacationReducer from "../slices/vacationSlice";
import authReducer from "../slices/authSlice";
import requestReducer from "../slices/requestSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        vacation: vacationReducer,
        auth: authReducer,
        requests: requestReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
