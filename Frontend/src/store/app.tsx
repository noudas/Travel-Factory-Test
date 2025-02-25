import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import vacationReducer from "../slices/vacationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        vacation: vacationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
