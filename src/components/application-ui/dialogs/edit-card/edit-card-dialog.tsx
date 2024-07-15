import Card from "@mui/material/Card"
import Dialog from "@mui/material/Dialog"
import { Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card"
import EditCard from "./edit-card-form"

type EditCardDialogProps = {
  dialogOpen: boolean
  toggleDialog: () => void
  card: DeleteOrUpdateCardRequest
}

export default function EditCardDialog(props: EditCardDialogProps) {
  const { dialogOpen, toggleDialog, card } = props

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"))

  return (
    <Dialog scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog}>
      <Card sx={{ minWidth: "50%", padding: "2rem 3rem" }}>
        <EditCard closeDialog={toggleDialog} card={card} />
      </Card>
    </Dialog>
  )
}
