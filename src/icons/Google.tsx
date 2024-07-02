import React from "react"

import { cn } from "@/lib/utils"

const Google = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("flex-shrink-0", className)}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8379 14.2181C20.9459 13.6681 20.9999 13.0881 20.9999 12.5081C20.9999 12.1161 20.9739 11.7341 20.9239 11.3611C20.8869 11.0871 20.6429 10.8881 20.3669 10.8881H12.5619C12.2519 10.8881 11.9999 11.1401 11.9999 11.4501V13.6561C11.9999 13.9661 12.2519 14.2181 12.5619 14.2181H16.8369C17.0129 14.2181 17.1419 14.3981 17.0759 14.5611C16.1409 16.8711 13.6859 18.3871 10.9439 17.8801C8.83793 17.4911 7.11193 15.8211 6.65993 13.7281C5.89293 10.1761 8.57693 7.03814 11.9999 7.03814C13.1219 7.03814 14.1619 7.37514 15.0289 7.95214C15.2609 8.10614 15.5639 8.09114 15.7599 7.89214L17.4619 6.15914C17.6939 5.92214 17.6799 5.52814 17.4159 5.32714C15.9749 4.23114 14.1929 3.56514 12.2549 3.51214C7.38293 3.37714 3.16393 7.33514 3.00493 12.2061C2.83793 17.3141 6.93193 21.5081 11.9999 21.5081C16.3829 21.5081 20.0369 18.3681 20.8379 14.2181Z"
      fill="currentColor"
    />
  </svg>
)

export default Google
