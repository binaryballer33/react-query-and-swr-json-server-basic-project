import { BoxProps } from "@mui/material/Box"
import { Fragment, ReactNode } from "react"
// STYLED COMPONENTS
import { Dot, DotList } from "../styles"

// ==============================================================
interface Props extends BoxProps {
    dotColor?: string
}
// ==============================================================

export default function CarouselDots({ dotColor, ...props }: Props) {
    return {
        customPaging: () => <Dot dotColor={dotColor} />,
        appendDots: (dots: ReactNode) => (
            <DotList component="ul" {...props}>
                {dots}
            </DotList>
        ),
    }
}
