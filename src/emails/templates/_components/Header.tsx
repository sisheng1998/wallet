import React from "react"
import { Font, Head } from "@react-email/components"

import {
  FALLBACK_FONT,
  FONT,
  WEB_FONT,
} from "@/emails/templates/_components/constants"

const Header = ({ title }: { title: string }) => (
  <Head>
    {[400, 600].map((weight, index) => (
      <Font
        key={index}
        fontFamily={FONT}
        fallbackFontFamily={FALLBACK_FONT}
        webFont={WEB_FONT}
        fontWeight={weight}
      />
    ))}

    <title>{title}</title>
  </Head>
)

export default Header
