import Close from "@mui/icons-material/Close"
import { Box, BoxProps } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Carousel from "src/components/application-ui/carousel/carousel"
import FlexBox from "src/components/base/flex-box/flex-box"
import { H2, H6, Paragraph } from "src/components/base/typography"
import { DeleteOrUpdateCardRequest } from "src/model/cards/card"
import GAME from "src/model/cards/game"

type ImageBoxProps = BoxProps & {
    src: string
    alt: string
}

type CardItemQuickViewDialogProps = {
    card: DeleteOrUpdateCardRequest
    dialogOpen: boolean
    toggleDialog: () => void
}

function ImageBox(props: ImageBoxProps) {
    return <Box component="img" {...props} />
}

export default function CardItemQuickViewDialog(props: CardItemQuickViewDialogProps) {
    const { card, dialogOpen, toggleDialog } = props

    return (
        <Dialog open={dialogOpen} maxWidth={false} onClose={toggleDialog} sx={{ zIndex: 1501 }}>
            <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
                <div>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Carousel
                                slidesToShow={1}
                                arrowStyles={{
                                    boxShadow: 0,
                                    color: "primary.main",
                                    backgroundColor: "transparent",
                                }}
                            >
                                {[card.img, card.img].map((item: string, index: number) => (
                                    <ImageBox
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                        src={item}
                                        alt="card"
                                        sx={{
                                            mx: "auto",
                                            width: "100%",
                                            objectFit: "contain",
                                            height: { sm: 400, xs: 250 },
                                        }}
                                    />
                                ))}
                            </Carousel>
                        </Grid>

                        <Grid item md={6} xs={12} alignSelf="center">
                            {/* Card Name */}
                            <Stack>
                                <H2>{card.name}</H2>

                                {card.game === GAME.POKEMON && <H2>Pokédex # {card.id}</H2>}
                            </Stack>

                            {/* Card Rating */}
                            <FlexBox alignItems="center" gap={1} mt={1}>
                                <Rating color="warn" value={4} readOnly />
                                <H6 lineHeight="1">(50)</H6>
                            </FlexBox>

                            {/* Card Description */}
                            <Paragraph my={2}>
                                Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero
                                eu augue. Morbi purus liberpuro ate vol faucibus adipiscing.
                            </Paragraph>
                        </Grid>
                    </Grid>
                </div>

                <IconButton sx={{ position: "absolute", top: 3, right: 3 }} onClick={toggleDialog}>
                    <Close fontSize="small" color="secondary" />
                </IconButton>
            </DialogContent>
        </Dialog>
    )
}
