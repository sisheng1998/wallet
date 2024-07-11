import React from "react"
import { Container, Text } from "@react-email/components"

const Footer = () => (
  <Container className="mt-6 px-8 text-center text-neutral-400">
    <Text className="m-0 text-xs">
      This is an automated email. Please do not reply to this email.
    </Text>

    <Text className="mb-0 mt-3 text-xs">
      Copyright © {new Date().getFullYear()} - Wallet
    </Text>
  </Container>
)

export default Footer
