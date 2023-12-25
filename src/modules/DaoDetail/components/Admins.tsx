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
export const Admins: FC<{data: IDAODetailResponse | undefined}> = ({data}) => {
    console.log("body data: ", data)
    return (
      <>
        <Grid item xs={12} marginX={2} mb={3}>
            <Typography variant="h5" mb={1}>Admins</Typography>
            <Typography mb={1}>Admins can only update settings on the Tally page - not the smart contracts</Typography>
            <Divider variant="middle"/>
            <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} marginY={1.5}>
                <Avatar sx={{ width: 40, height: 40, mr: 2 }}></Avatar>
                <Stack>
                    <Typography variant="subtitle1">0xbff47Cca2C5b889d2E75E58C0639e2Ae497E5f5c</Typography>
                    <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
                        <Typography sx={{mr: 3, fontWeight: "bold"}}>SUPERADMIN</Typography>
                        <Typography sx={{mr: 3, color: "green",fontWeight: "bold"}}>THIS IS YOU</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider variant="middle"/>
        </Grid>
      </>
    );
};