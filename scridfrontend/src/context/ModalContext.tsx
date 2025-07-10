"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the context shape
interface ModalContextType {
  isLoginOpen: boolean;
  setLoginOpen: (value: boolean) => void;
  isSignupOpen: boolean;
  setSignupOpen: (value: boolean) => void;
}

// 2. Create the actual context
const ModalContext = createContext<ModalContextType | null>(null);

// 3. Create a custom hook to use the modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

// 4. Provider component that wraps your app
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, setLoginOpen, isSignupOpen, setSignupOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
