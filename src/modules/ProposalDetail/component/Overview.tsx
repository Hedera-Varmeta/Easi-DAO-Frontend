import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
    Avatar,
    Button,
    Box
  } from "@mui/material";
  
  export const Overview = () => {
    return (
        <>
            <Stack sx={{padding: 1}}>
                <Typography variant="h3" mb={3}>
                    Overview
                </Typography>
                <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
                    <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} mr={3}>
                        <Avatar sx={{width: 10, height: 10, background: "green", borderRadius: "50%"}}></Avatar>
                        <Typography variant="subtitle2" sx={{mr: 1, fontSize: 10}}>For</Typography>
                        <Typography sx={{fontSize: 10}}>99.8%</Typography>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} mr={3}>
                        <Avatar sx={{width: 10, height: 10, background: "red", borderRadius: "50%"}}></Avatar>
                        <Typography variant="subtitle2" sx={{mr: 1, fontSize: 10}}>Against</Typography>
                        <Typography sx={{fontSize: 10}}>0.17%</Typography>
                    </Stack>
                    <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} mr={3}>
                        <Avatar sx={{width: 10, height: 10, background: "gray", borderRadius: "50%"}}></Avatar>
                        <Typography variant="subtitle2" sx={{mr: 1, fontSize: 10}}>Abstain</Typography>
                        <Typography sx={{fontSize: 10}}>0.02%</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
  };