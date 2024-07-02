"use client"

import React, { createContext, useState } from "react"

export const MODES = ["OTP", "Magic Link"] as const

type Mode = (typeof MODES)[number]

export const AuthContext = createContext<{
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}>({
  email: "",
  setEmail: () => {},
  mode: "OTP",
  setMode: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string>("")
  const [mode, setMode] = useState<Mode>("OTP")

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        mode,
        setMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
