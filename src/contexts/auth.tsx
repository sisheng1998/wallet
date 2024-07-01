"use client";
import React, { useState, createContext } from "react";

export const AuthContext = createContext<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}>({
  email: "",
  setEmail: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
