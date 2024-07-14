import type { LinkProps } from "next/link"
import Link from "next/link"
import { forwardRef } from "react"

type RouterLinkProps = Omit<LinkProps, "to"> & {
  href: string
}

const RouterLink = forwardRef((props: RouterLinkProps, ref: any) => {
  return <Link ref={ref} {...props} />
})

RouterLink.displayName = "RouterLink"

export default RouterLink
