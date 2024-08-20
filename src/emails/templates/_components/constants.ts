import { FontProps } from "@react-email/font"

export const BASE_URL = (process.env as unknown as CloudflareEnv).BASE_URL || ""

export const FONT: FontProps["fontFamily"] = "Plus Jakarta Sans"

export const FALLBACK_FONT: FontProps["fallbackFontFamily"] = "Verdana"

// https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap

export const WEB_FONT: FontProps["webFont"] = {
  url: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2",
  format: "woff2",
}
