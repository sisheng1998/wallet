import React from "react"
import { Button, Text } from "@react-email/components"

import Disclaimer from "@/emails/templates/_components/Disclaimer"
import Layout from "@/emails/templates/_components/Layout"

const MagicLink = ({ name, url }: { name: string; url: string }) => (
  <Layout
    title="Your Magic Link"
    previewText="Login to Wallet with Magic Link"
    name={name}
  >
    <Text>Click the button below to login:</Text>

    <Button
      href={url}
      className="w-full rounded bg-neutral-900 py-4 text-center text-base font-semibold text-white"
    >
      Login to Wallet
    </Button>

    <Text>This link will only be valid for the next 5 minutes.</Text>

    <Disclaimer />
  </Layout>
)

export default MagicLink

MagicLink.PreviewProps = {
  name: "Si Sheng",
  url: "https://example.com",
}
