import React from "react"
import { Heading } from "@react-email/heading"
import { Section } from "@react-email/section"
import { Text } from "@react-email/text"

import Disclaimer from "@/emails/templates/_components/Disclaimer"
import Layout from "@/emails/templates/_components/Layout"

const OTP = ({ name, code }: { name: string; code: string }) => (
  <Layout
    title="Your One-Time Password (OTP)"
    previewText="Login to Wallet with this One-Time Password (OTP)"
    name={name}
  >
    <Text>Enter the following code to login:</Text>

    <Section className="rounded border border-solid border-neutral-200 bg-neutral-50 p-6">
      <Heading
        as="h2"
        className="m-0 text-center text-3xl font-semibold tracking-wider text-neutral-900"
      >
        {code}
      </Heading>
    </Section>

    <Text>This code will only be valid for the next 5 minutes.</Text>

    <Disclaimer />
  </Layout>
)

export default OTP

OTP.PreviewProps = {
  name: "Si Sheng",
  code: "123456",
}
