import Box, { BoxProps } from "@mui/material/Box"

export default function FlexCenter({ children, ...props }: BoxProps) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" {...props}>
            {children}
        </Box>
    )
}
