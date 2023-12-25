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
export const TimelockAssets: FC<{ data: IDAODetailResponse | undefined }> = ({ data }) => {
    console.log("body data: ", data)
    return (
        <>
            <Grid item xs={12} marginX={2} mb={8}>
                <Typography variant="h5" mb={1}>Timelock Assets</Typography>
                <Divider variant="middle" />
                <Typography variant="h6" marginY={2}>0.00 USD</Typography>
                <Typography variant="subtitle1" marginY={1}>Total Balance: </Typography>
                <Divider variant="middle" />
                <Grid item xs={12} display={"flex"} flexDirection={"row"} alignItems={"center"} marginY={1}>
                    <Grid item xs={5}>
                        <Typography variant="subtitle1">Assets</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Balance</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1">Value (24h change)</Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} marginY={1}>
                    <Button variant="contained" sx={{ background: "black", paddingY: 1, paddingX: 2 }}>
                        <Typography>View all</Typography>
                    </Button>
                </Stack>
            </Grid>

        </>
    );
};