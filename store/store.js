import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import manageExpenseSlice from "./manageExpenseSlice";

const store = configureStore({
    reducer: {
        authHandler: authSlice,
        manageExpenseHandler: manageExpenseSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
