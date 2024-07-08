"use client"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  DialogContent,
  Divider,
  IconButton,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useCallback, useState } from "react"
import DrawerContent from "./drawer-content"

function WideFormDrawer() {
  const [open, setOpen] = useState<boolean>(false)
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
  const theme = useTheme()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      display="flex"
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="center"
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      />

      <Card
        elevation={24}
        sx={{
          mt: { xs: 3, md: 0 },
          position: "relative",
          display: "flex",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.default, 0.96)
              : alpha(theme.palette.background.paper, 0.8),
          backgroundFilter: "blur(8px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent sx={{ padding: "0px !important" }}>
          <Button onClick={handleDrawerOpen} variant="contained">
            Add Card
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={open}
            onOpen={handleDrawerOpen}
            onClose={handleDrawerClose}
            PaperProps={{
              sx: {
                width: "100%",
                maxWidth: { xs: 340, md: 540, lg: 720 },
                overflow: "visible",
                flexDirection: "row",
              },
            }}
            ModalProps={{
              BackdropProps: {
                sx: {
                  backdropFilter: "blur(3px) !important",
                  background: (theme) => alpha(theme.palette.background.default, 0.96),
                },
              },
            }}
          >
            <DialogContent sx={{ p: 0 }}>
              <Box overflow="hidden" display="flex" flexDirection="column" width="100%">
                <CardHeader
                  title={
                    <Container maxWidth="sm">
                      <Typography variant="h4" color="text.primary" fontWeight={600}>
                        Add Card
                      </Typography>
                      <Typography variant="subtitle1">Fill in card details using the fields below</Typography>
                    </Container>
                  }
                  disableTypography
                  sx={{
                    px: 0,
                    position: "relative",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
                    flexDirection: "row",
                    ".MuiCardHeader-action": {
                      mt: "-4px",
                      position: "absolute",
                      right: theme.spacing(1),
                      top: theme.spacing(1.5),
                    },
                  }}
                  action={
                    <IconButton size="small" onClick={handleDrawerClose}>
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent sx={{ px: 0 }}>
                  <DrawerContent />
                </CardContent>
                <Divider />
                <CardActions
                  sx={{
                    width: "100%",
                    flexDirection: { xs: "column-reverse", sm: "row" },

                    "& > :not(:first-of-type)": {
                      marginLeft: { xs: 0, sm: theme.spacing(1) },
                      marginBottom: { xs: theme.spacing(1), sm: 0 },
                    },
                    justifyContent: "flex-end",
                  }}
                >
                  <Button onClick={handleDrawerClose} fullWidth={!mdUp}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleDrawerClose} fullWidth={!mdUp}>
                    Save
                  </Button>
                </CardActions>
              </Box>
            </DialogContent>
          </SwipeableDrawer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WideFormDrawer
