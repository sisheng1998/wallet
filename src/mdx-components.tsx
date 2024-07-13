import Image, { ImageProps } from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"

import { Paths } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  a: ({ href, children }) => (
    <Button variant="link" className="not-prose h-auto p-0 text-base" asChild>
      <Link href={href || Paths.Home} target="_blank">
        {children}
      </Link>
    </Button>
  ),
  img: (props) => (
    <Image
      className="rounded-md"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
      alt={props.alt || ""}
    />
  ),
  ...components,
})
