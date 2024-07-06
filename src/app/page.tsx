import { Container } from "@mui/material"
import AlternateTabs from "src/components/application-ui/tabs/alternate"

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <AlternateTabs />
    </Container>
  )
}
