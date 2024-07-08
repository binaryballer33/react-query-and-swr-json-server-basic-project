import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded"
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material"
import QuillEditor from "src/components/base/styles/quill-editor"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"

function ProfileFormStacked() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Bob Smith"])

  const handleChangeManager = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target
    // @ts-ignore
    setSelectedOptions(typeof value === "string" ? value.split(",") : value)
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {/* Card Name */}
      <Grid xs={12}>
        <FormControl fullWidth size="small" variant="outlined">
          <Typography variant="h6" gutterBottom component="label" htmlFor="firstname-input" fontWeight={500}>
            Card Name
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12}>
              <OutlinedInput id="name-input" fullWidth size="small" placeholder="Name" />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      {/* Card Id */}
      <Grid xs={12} md={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <Typography variant="h6" gutterBottom component="label" htmlFor="id-input" fontWeight={500}>
            Id
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12}>
              <OutlinedInput id="id-input" fullWidth size="small" placeholder="Id" />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      {/* Card Img Url */}
      <Grid xs={12} md={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <Typography variant="h6" gutterBottom component="label" htmlFor="img-input" fontWeight={500}>
            Image Url
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12}>
              <OutlinedInput id="img-input" fullWidth size="small" placeholder="Image URL" />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      {/* Card Atk */}
      <Grid xs={12} md={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <Typography variant="h6" gutterBottom component="label" htmlFor="atk-input" fontWeight={500}>
            Atk
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12}>
              <OutlinedInput id="atk-input" fullWidth size="small" placeholder="Atk" />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      {/* Card Def */}
      <Grid xs={12} md={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <Typography variant="h6" gutterBottom component="label" htmlFor="def-input" fontWeight={500}>
            Def
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12}>
              <OutlinedInput id="def-input" fullWidth size="small" placeholder="Def" />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ProfileFormStacked
