import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/auth.slice";
import userReducer from "./features/user/user.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
