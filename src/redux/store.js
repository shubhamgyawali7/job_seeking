import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer.js";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
