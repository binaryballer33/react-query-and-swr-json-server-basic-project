"use client"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import LastPageIcon from "@mui/icons-material/LastPage"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import FlexEvenly from "src/components/base/flex-box/flex-evenly"

type PaginationControlsProps = {
    limit: number
    page: number
    firstItem: number
    lastItem: number
    isPlaceHolderData: boolean
    items: any[]
}

export default function PaginationControls(props: PaginationControlsProps) {
    const { limit, page, firstItem, lastItem, isPlaceHolderData, items } = props

    const router = useRouter()

    const totalItems: number = items.length
    const lastPage = Math.ceil(totalItems / limit)
    const cardsPerPageOptions = [5, 10, 25, 50, 100]

    const handleChangeItemsPerPage = useCallback(
        (event: SelectChangeEvent) => {
            // if the new limit is less than the current page, go to the first page
            const newLimit = parseInt(event.target.value, 10)
            const newPage = Math.ceil(totalItems / newLimit) >= page ? page : 1
            router.push(`/?_limit=${newLimit}&_page=${newPage}`)
        },
        [page, router, totalItems],
    )

    const handleGoToPage = useCallback(
        (page: number) => {
            router.push(`/?_limit=${limit}&_page=${page}`)
        },
        [router, limit],
    )

    const handleChangePage = useCallback(
        (direction: "prev" | "next") => {
            const newPage = direction === "next" ? page + 1 : page - 1
            router.push(`/?_limit=${limit}&_page=${newPage}`)
        },
        [router, page, limit],
    )

    return (
        <>
            {/* Pagination Text */}
            <FlexEvenly>
                {/* Dropdown For  Cards Per Page */}
                <FormControl size="small" sx={{ width: 120 }}>
                    <InputLabel htmlFor="demo-pagination-select-label">Cards per page</InputLabel>
                    <Select
                        value={String(limit)}
                        label="Item per page"
                        onChange={handleChangeItemsPerPage}
                        inputProps={{ id: "demo-pagination-select-label" }}
                    >
                        {/* Dropdown Options */}
                        {cardsPerPageOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Indicates Many Cards Are Showing Out Of The Total Cards */}
                <span>
                    {firstItem + 1}-{lastItem} of {totalItems}
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

                <span>
                    Page: {page} of {lastPage}
                </span>

                <Button onClick={() => handleChangePage("next")} disabled={isPlaceHolderData || page === lastPage}>
                    <ChevronRightIcon />
                </Button>
                <Button onClick={() => handleGoToPage(lastPage)} disabled={isPlaceHolderData}>
                    <LastPageIcon />
                </Button>
            </FlexEvenly>
        </>
    )
}
