import React from "react"
import { Button as ReactEmailButton } from "@react-email/components"

const Button = ({ href, text }: { href: string; text: string }) => (
  <ReactEmailButton
    href={href}
    className="w-full rounded bg-neutral-900 py-4 text-center text-base font-semibold text-white"
  >
    {text}
  </ReactEmailButton>
)

export default Button
