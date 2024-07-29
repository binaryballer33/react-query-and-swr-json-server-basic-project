import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LastPageIcon from "@mui/icons-material/LastPage"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import FlexEvenly from "src/components/base/flex-box/flex-evenly"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card"

type PaginationControlsProps = {
    setPage: Dispatch<SetStateAction<number>>
    isPlaceHolderData: boolean
    data: {
        cards: DeleteOrUpdateCardRequest[]
        totalCards: number
        totalPages: number
        limit: number
        page: number
    }
}

export default function PaginationControls(props: PaginationControlsProps) {
    const {
        data: { totalCards, totalPages, limit, page },
        setPage,
        isPlaceHolderData,
    } = props

    const router = useRouter()

    const firstCard = (page - 1) * limit + 1
    const lastCard = Math.min(page * limit, totalCards)
    const [cardsPerPage, setCardsPerPage] = useState<number>(limit)

    const handleChangeRowsPerPage = useCallback((event: SelectChangeEvent) => {
        setCardsPerPage(parseInt(event.target.value, 10))
        // setPage(1)
    }, [])

    const handleGoToPage = useCallback(
        (page: number) => {
            router.push(`?_limit=${cardsPerPage}&_page=${page}`)
            setPage(page)
        },
        [setPage, router, cardsPerPage],
    )

    const handleChangePage = useCallback(
        (direction: "prev" | "next") => {
            const newPage = direction === "next" ? page + 1 : page - 1
            router.push(`?_limit=${cardsPerPage}&_page=${newPage}`)
            setPage(newPage)
        },
        [setPage, router, page, cardsPerPage],
    )

    return (
        <>
            {/* Pagination Text */}
            <FlexEvenly>
                <span>
                    Page: {page} of {totalPages}
                </span>

                {/* Dropdown For  Cards Per Page */}
                <FormControl size="small" sx={{ width: 120 }}>
                    <InputLabel htmlFor="demo-pagination-select-label">Cards per page</InputLabel>
                    <Select
                        value={String(cardsPerPage)}
                        label="Item per page"
                        onChange={handleChangeRowsPerPage}
                        inputProps={{ id: "demo-pagination-select-label" }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>

                {/* How Many Cards Are Showing Out Of The Total Cards */}
                <span>
                    {firstCard}-{lastCard} of {totalCards}
                </span>
            </FlexEvenly>

            {/* Pagination Buttons */}
            <FlexEvenly justifyContent="space-evenly">
                <Button onClick={() => handleGoToPage(1)} disabled={isPlaceHolderData}>
                    <FirstPageIcon />
                </Button>
                <Button onClick={() => handleChangePage("prev")} disabled={page === 1 || isPlaceHolderData}>
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={() => handleChangePage("next")} disabled={isPlaceHolderData || page === totalPages}>
                    <ChevronRightIcon />
                </Button>
                <Button onClick={() => handleGoToPage(totalPages)} disabled={isPlaceHolderData}>
                    <LastPageIcon />
                </Button>
            </FlexEvenly>
        </>
    )
}
