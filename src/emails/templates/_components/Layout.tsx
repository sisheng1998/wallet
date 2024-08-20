import React from "react"
import { Body } from "@react-email/body"
import { Container } from "@react-email/container"
import { Heading } from "@react-email/heading"
import { Html } from "@react-email/html"
import { Img } from "@react-email/img"
import { Link } from "@react-email/link"
import { Preview } from "@react-email/preview"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"

import { BASE_URL } from "@/emails/templates/_components/constants"
import Footer from "@/emails/templates/_components/Footer"
import Header from "@/emails/templates/_components/Header"

const Layout = ({
  title,
  previewText,
  name,
  children,
}: {
  title: string
  previewText: string
  name: string
  children: React.ReactNode
}) => (
  <Html>
    <Header title={title} />

    <Preview>{previewText}</Preview>

    <Tailwind>
      <Body className="m-0 bg-neutral-100 p-6 text-neutral-700">
        <Container className="rounded-md border border-solid border-neutral-200 bg-white p-8">
          <Link href={BASE_URL} className="mt-1 inline-block">
            <Img
              src={`${BASE_URL || "/static"}/logo.png`}
              alt="Wallet"
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </Link>

          <Heading className="mb-6 mt-8 text-2xl font-semibold leading-tight text-neutral-900">
            {title}
          </Heading>

          <Text>Hi {name},</Text>

          {children}

          <Text className="mb-0 mt-6">Best,</Text>
          <Text className="my-0">- Wallet Team</Text>
        </Container>

        <Footer />
      </Body>
    </Tailwind>
  </Html>
)

export default Layout
