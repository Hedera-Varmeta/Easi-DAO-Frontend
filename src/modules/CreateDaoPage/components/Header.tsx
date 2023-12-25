import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { DotIcon } from "../styled";

export const Header = () => {
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={1} mb={3}>
          <Typography variant="h5">Add your DAO to Ally</Typography>
          <Typography variant="subtitle1">
            We support the OpenZeppelin Governor Standard for on-chain DAOs
          </Typography>
        </Stack>
        <Divider variant="middle"/>
      </Grid>

      <Grid item xs={12} mt={3}>
        <Typography variant="h5">Governor Standard</Typography>
        <List sx={{ marginBottom: 1}}>
          <ListItem disablePadding>
            <DotIcon />
            <ListItemText>
              <Typography variant="subtitle1">
                Trusted by the largest DAOs (Uniswap, AAVE, ENS, Nouns, Gitcoin,
                Compound)
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <DotIcon />
            <ListItemText>
              <Typography variant="subtitle1">
                Protects billions of dollars in assets
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <DotIcon />
            <ListItemText>
              <Typography variant="subtitle1">
                Integrations with Gnosis Zodiac + Safe, Juicebox, Lens Protocol,
                Nouns and more
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider variant="middle"/>
      </Grid>
    </>
  );
};
