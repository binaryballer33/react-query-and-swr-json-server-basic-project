import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LastPageIcon from "@mui/icons-material/LastPage"
import { Button } from "@mui/material/"
import FlexEvenly from "src/components/base/flex-box/flex-evenly"

type PaginationControlsProps = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  isPlaceHolderData: boolean
}

export default function PaginationControls(props: PaginationControlsProps) {
  const { page, setPage, isPlaceHolderData } = props

  return (
    <>
      <span>Current Page: {page}</span>
      <FlexEvenly justifyContent="space-evenly">
        <Button onClick={() => setPage(1)} disabled={isPlaceHolderData}>
          <FirstPageIcon />
        </Button>
        <Button onClick={() => setPage((page) => Math.max(page - 1, 1))} disabled={page === 1 || isPlaceHolderData}>
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => {
            setPage((page) => page + 1)
          }}
          disabled={isPlaceHolderData}
        >
          <ChevronRightIcon />
        </Button>
        <Button onClick={() => setPage(51)} disabled={isPlaceHolderData}>
          <LastPageIcon />
        </Button>
      </FlexEvenly>
    </>
  )
}
