"use client"

import CreditCardIcon from "@mui/icons-material/CreditCard"
import {
    Box,
    Card,
    CardHeader,
    Divider,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    styled,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { ReactNode, SyntheticEvent, useState } from "react"
import DragonBallZCards from "src/components/application-ui/tabs/cards/dragon-ball-z/dragon-ball-z-cards"
import PokemonCards from "src/components/application-ui/tabs/cards/pokemon/pokemon-cards"
import PokemonCardsPaginated from "src/components/application-ui/tabs/cards/pokemon/pokemon-cards-paginated"
import YuGiOhCards from "src/components/application-ui/tabs/cards/yu-gi-oh/yu-ig-oh-cards"
import useHeader from "src/hooks/use-header"
import CreateCardFormDialog from "../dialogs/create-card/create-card-form-dialog"

const TabsAlternate = styled(Tabs)(({ theme }) => ({
    overflow: "visible",
    minHeight: 0,

    ".MuiTabs-flexContainer": {
        position: "relative",
        zIndex: 6,
    },

    ".MuiTabs-scroller": {
        overflow: "visible !important",
    },

    ".MuiTab-root": {
        padding: theme.spacing(1, 2),
        transition: theme.transitions.create(["color", "background-color"], {
            duration: theme.transitions.duration.standard,
        }),
        minHeight: 0,
        height: 44,
        fontWeight: 600,
        margin: theme.spacing(0, 0.5),

        "&.Mui-selected": {
            color: theme.palette.primary.contrastText,
        },
    },
    ".MuiTabs-indicator": {
        height: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",

        "&::after": {
            content: '""',
            height: 44,
            width: "100%",
            position: "absolute",
            top: -44,
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.primary.main,
            boxShadow: theme.shadows[1],
        },
    },
}))

type TabPanelProps = {
    children?: ReactNode
    index: number
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3, maxHeight: 700, overflow: "scroll" }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export default function CardTabs() {
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const [value, setValue] = useState(2)

    const { dialogOpen, toggleDialog } = useHeader()

    // need event even if not used or component does not work
    const handleTabChange = (_event: SyntheticEvent, newValue: number) => setValue(newValue)

    const handleSelectChange = (event: SelectChangeEvent<number>) => setValue(Number(event.target.value))

    return (
        <Stack
            justifyContent="center"
            spacing={{ xs: 2, sm: 3 }}
            alignItems="center"
            direction={{ xs: "column", sm: "row" }}
            border={1}
        >
            <Card
                sx={{
                    width: "100%",
                }}
            >
                {/* Add Card Dialog  */}
                <Box display="flex" minWidth={1} justifyContent="space-around">
                    <CardHeader title="My Cards" sx={{ color: "primary.main" }} />
                    <Box>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="body2">Add Card</Typography>
                            <IconButton onClick={toggleDialog}>
                                <CreditCardIcon />
                            </IconButton>
                        </Box>
                        <CreateCardFormDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} />
                    </Box>
                </Box>

                <Divider />

                {/* Tabs */}
                <CardHeader
                    sx={{
                        ".MuiCardHeader-content": {
                            overflow: "visible",
                        },
                    }}
                    disableTypography
                    title={
                        smUp ? (
                            <TabsAlternate
                                value={Number(value)}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                textColor="secondary"
                                indicatorColor="secondary"
                            >
                                <Tab label="Yu-Gi-Oh" {...a11yProps(0)} />
                                <Tab label="Dragon Ball Z" {...a11yProps(1)} />
                                <Tab label="Pokemon" {...a11yProps(2)} />
                                <Tab label="Pokemon Paginated" {...a11yProps(3)} />
                            </TabsAlternate>
                        ) : (
                            <Select value={value} onChange={handleSelectChange} fullWidth>
                                <MenuItem value={0}>Yu-Gi-Oh</MenuItem>
                                <MenuItem value={1}>Dragon Ball Z</MenuItem>
                                <MenuItem value={2}>Pokemon</MenuItem>
                                <MenuItem value={3}>Pokemon Paginated</MenuItem>
                            </Select>
                        )
                    }
                />
                <Divider />

                {/* Cards  */}
                <>
                    {/* Tab 1 Yu-Gi-Oh Cards */}
                    <CustomTabPanel value={value} index={0}>
                        <Stack spacing={2}>
                            <YuGiOhCards />
                        </Stack>
                    </CustomTabPanel>

                    {/* Tab 2 Dragon Ball Z Cards */}
                    <CustomTabPanel value={value} index={1}>
                        <Stack spacing={2}>
                            <DragonBallZCards />
                        </Stack>
                    </CustomTabPanel>

                    {/* Tab 3  Pokemon Cards */}
                    <CustomTabPanel value={value} index={2}>
                        <Stack spacing={2}>
                            <PokemonCards />
                        </Stack>
                    </CustomTabPanel>

                    {/* Tab 4 Pokémon Cards Paginated */}
                    <CustomTabPanel value={value} index={3}>
                        <Stack spacing={2}>
                            <PokemonCardsPaginated />
                        </Stack>
                    </CustomTabPanel>
                </>
            </Card>
        </Stack>
    )
}
