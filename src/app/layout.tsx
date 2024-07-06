import type { Metadata } from "next"
import { Inter } from "next/font/google"
import SWRProvider from "src/context/swr"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Testing SWR with Next.js",
  description: "Stale-While-Revalidate (SWR) with Next.js",
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  )
}
