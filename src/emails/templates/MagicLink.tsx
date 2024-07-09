import React from "react"
import { Text } from "@react-email/components"

import Button from "@/emails/templates/_components/Button"
import Disclaimer from "@/emails/templates/_components/Disclaimer"
import Layout from "@/emails/templates/_components/Layout"

const MagicLink = ({ name, url }: { name: string; url: string }) => (
  <Layout
    title="Your Magic Link"
    previewText="Login to Wallet with this Magic Link"
    name={name}
  >
    <Text>Click the button below to login:</Text>

    <Button href={url} text="Login to Wallet" />

    <Text>This link will only be valid for the next 5 minutes.</Text>

    <Disclaimer />
  </Layout>
)

export default MagicLink

MagicLink.PreviewProps = {
  name: "Si Sheng",
  url: "https://example.com",
}
