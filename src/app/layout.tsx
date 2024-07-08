import { Box } from "@mui/material"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ProviderLayout from "src/layouts"

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
        <ProviderLayout>
          <Box width="95%" m="auto">
            <Box my={2}>{children}</Box>
          </Box>
        </ProviderLayout>
      </body>
    </html>
  )
}
