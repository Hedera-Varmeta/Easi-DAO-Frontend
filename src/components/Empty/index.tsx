import { Box, BoxProps, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  imageWidth?: number;
  imageHeight?: number;
  text?: string
} & BoxProps

export const Empty = ({ imageWidth = 60, imageHeight = 60, text = 'Data not found', ...props }: Props) => {
  return (
    <>
      <Box
        display="flex"
        gap={2}
        width="100%"
        sx={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}
        my={2}
        {...props}
      >
        <Image src="/images/noData.png" alt={"No Data"} width={imageWidth} height={imageHeight} />
        <Typography variant="h5" color="primary">
          {text}
        </Typography>
      </Box>
    </>
  );
};
