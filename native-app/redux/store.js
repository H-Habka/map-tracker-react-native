import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./featuers/userSlice";
import locationSlice from "./featuers/locationSlice";

const rootReducer = combineReducers({
    userSlice,
    locationSlice
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
