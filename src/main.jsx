import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Route";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
        <RouterProvider router={router} />
      </PersistGate>

    </Provider>

  </StrictMode>
);
