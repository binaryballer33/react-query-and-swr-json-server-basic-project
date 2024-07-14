import Card from "@mui/material/Card"
import Dialog from "@mui/material/Dialog"
import { Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import CreateCard from "./create-card-form"

type CreateCardDialogProps = {
  dialogOpen: boolean
  toggleDialog: () => void
}

export default function CreateCardDialog(props: CreateCardDialogProps) {
  const { dialogOpen, toggleDialog } = props

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

  return (
    <Dialog scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog}>
      <Card sx={{ minWidth: "50%", padding: "2rem 3rem" }}>
        <CreateCard closeDialog={toggleDialog} />
      </Card>
    </Dialog>
  )
}
