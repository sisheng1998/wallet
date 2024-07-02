import React from "react"

import { cn } from "@/lib/utils"

const Logo = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("flex-shrink-0", className)}
  >
    <path
      d="M0 0.375C0 0.167893 0.167893 0 0.375 0V0C3.4816 0 6 2.5184 6 5.625V23.625C6 23.8321 5.83211 24 5.625 24V24C2.5184 24 0 21.4816 0 18.375V0.375Z"
      fill="currentColor"
    />
    <path
      d="M15 17.625C15 14.5184 12.4816 12 9.375 12V12C9.16789 12 9 12.1679 9 12.375V18.375C9 21.4816 11.5184 24 14.625 24V24C14.8321 24 15 23.8321 15 23.625V17.625Z"
      fill="currentColor"
    />
    <path
      d="M18 11.625C18 8.5184 20.5184 6 23.625 6V6C23.8321 6 24 6.16789 24 6.375V18.375C24 21.4816 21.4816 24 18.375 24V24C18.1679 24 18 23.8321 18 23.625V11.625Z"
      fill="currentColor"
    />
  </svg>
)

export default Logo
