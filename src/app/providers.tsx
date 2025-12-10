"use client"

import type React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Toaster } from "react-hot-toast"
import { store, persistor } from "@/lib/store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
        {children}
      </PersistGate>
    </Provider>
  )
}
