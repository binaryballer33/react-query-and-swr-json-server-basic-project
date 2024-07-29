import ClearIcon from "@mui/icons-material/Clear"
import {
    Box,
    FilledInput,
    FormControl,
    FormHelperText,
    Unstable_Grid2 as Grid,
    IconButton,
    InputAdornment,
    Tooltip,
    Typography,
} from "@mui/material"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { CreateCardRequest } from "src/model/cards/card"
import GAME from "src/model/cards/game"

type CreateCardInputProps = {
    register: UseFormRegister<CreateCardRequest>
    errors: FieldErrors<Omit<CreateCardRequest, GAME>>
    watchFormField: UseFormWatch<CreateCardRequest>
    setFormValue: UseFormSetValue<CreateCardRequest>
    inputName: keyof CreateCardRequest // must be lowercase
    placeholder: string
}

export default function CreateCardInput(props: CreateCardInputProps) {
    const { register, watchFormField, setFormValue, errors, inputName, placeholder } = props
    const { t } = useTranslation()

    // make the first letter of the inputName uppercase
    const inputNameForTypography = inputName.charAt(0).toUpperCase() + inputName.slice(1)

    return (
        <Grid xs={12}>
            <FormControl fullWidth error={Boolean([inputName.toString()])}>
                {/* Form Input Label And Button */}
                <Box display="flex" gap={0} p={1} justifyContent="space-between" alignItems="center">
                    {/* Input Label */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        component="label"
                        htmlFor={`${inputName}-input`}
                        fontWeight={500}
                    >
                        {t(inputNameForTypography)}
                    </Typography>
                </Box>

                {/* Field Input */}
                <FilledInput
                    hiddenLabel
                    {...register(inputName)}
                    type="text"
                    id={`${inputName}-input`}
                    placeholder={`Write your ${placeholder}`}
                    autoComplete={inputName}
                    required
                    endAdornment={
                        // only show clear icon if textfield is not empty
                        watchFormField(inputName as keyof CreateCardRequest) !== "" && (
                            <InputAdornment position="end">
                                <Tooltip title={`clear ${inputName}`}>
                                    {/* reset the input field */}
                                    <IconButton onClick={() => setFormValue(inputName as keyof CreateCardRequest, "")}>
                                        <ClearIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        )
                    }
                    sx={{ "& input": { padding: "8px 8px" } }}
                />
                {errors[inputName as keyof typeof errors] && (
                    <FormHelperText>{t(errors[inputName as keyof typeof errors]?.message as string)}</FormHelperText>
                )}
            </FormControl>
        </Grid>
    )
}
