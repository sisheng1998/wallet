import React from "react"
import { Text } from "@react-email/text"

import Button from "@/emails/templates/_components/Button"
import Layout from "@/emails/templates/_components/Layout"

const Welcome = ({ name, url }: { name: string; url: string }) => (
  <Layout
    title="Welcome to Wallet!"
    previewText="Simplify your finances, uncover savings, and make smart decisions effortlessly."
    name={name}
  >
    <Text>Thank you for signing up!</Text>

    <Text>
      {`We're excited to help you simplify your finances, uncover savings, and make smart decisions effortlessly!`}
    </Text>

    <Button href={url} text="Get Started" />
  </Layout>
)

export default Welcome

Welcome.PreviewProps = {
  name: "Si Sheng",
  url: "https://example.com",
}
