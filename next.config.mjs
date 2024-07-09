import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"
import createBundleAnalyzer from "@next/bundle-analyzer"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
}

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withBundleAnalyzer(withMDX(nextConfig))
