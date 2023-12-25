import { IDAODetailResponse } from "@/api/dao";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Avatar,
  Button
} from "@mui/material";
import { FC } from "react";
export const GnosisSafes: FC<{data: IDAODetailResponse | undefined}> = ({data}) => {
    console.log("body data: ", data)
    return (
      <>
        <Grid item xs={12} marginX={2} mb={8}>
            <Typography variant="h5" mb={1}>Gnosis Safes</Typography>
            <Divider variant="middle"/>
            <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} marginY={1}>
                <Typography variant="subtitle1">No safes found</Typography>
            </Stack>
        </Grid>
      </>
    );
};