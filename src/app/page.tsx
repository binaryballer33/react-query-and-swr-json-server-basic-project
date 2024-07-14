import { Box, Container } from "@mui/material"
import { HydrationBoundary } from "@tanstack/react-query"
import CardTabs from "src/components/application-ui/tabs/card-tabs"
import ThemeModeToggler from "src/components/application-ui/theme-mode-toggler/theme-mode-toggler"
import prefetchDataDehydrateState from "./prefetch-home-page-data"

export default async function Home() {
  const dehydratedState = await prefetchDataDehydrateState()
  return (
    <HydrationBoundary state={dehydratedState}>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Box my={4}>
          <ThemeModeToggler />
        </Box>
        <CardTabs />
      </Container>
    </HydrationBoundary>
  )
}
