import { Container } from "@mui/material"
import AlternateTabs from "src/components/application-ui/tabs/alternate"
import ThemeModeToggler from "src/components/application-ui/theme-mode-toggler/theme-mode-toggler"

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <ThemeModeToggler />
      <AlternateTabs />
    </Container>
  )
}
