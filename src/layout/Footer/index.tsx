import { routeEnums } from "@/types/routes";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BoxFooter } from "./styled";

const RESOURCES = [
  { title: "Developer Documentation", path: routeEnums.home },
  { title: "Governance Wiki", path: routeEnums.jobs },
  { title: "Blog", path: routeEnums.receiver },
  { title: "Knowledge Base", path: routeEnums.watchlist },
];

const COMPANY = [
  { title: "Jobs", path: routeEnums.home },
  { title: "Support", path: routeEnums.jobs },
  { title: "Terms of Service", path: routeEnums.receiver },
  { title: "Privacy Policy", path: routeEnums.watchlist },
];

export const Footer = () => {
  return (
    <footer>
      <Container>
        {/* <BoxFooter>
          <Grid container columns={12}>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <Typography variant="h5">Resources</Typography>
                {RESOURCES.map((item) => (
                  <Typography key={item.path}>{item.title}</Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <Typography variant="h5">Company</Typography>
                {COMPANY.map((item) => (
                  <Typography key={item.path}>{item.title}</Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <Typography variant="h5">Newsletter</Typography>
                <Typography>
                  Signup for our newsletter to get the latest news in your
                  inbox.
                </Typography>
                <TextField
                  size="small"
                  placeholder="Enter email"
                  label="Email"
                  color="primary"
                />
                <Typography>
                  Your email is safe with us. We dont spam.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </BoxFooter> */}

        <Grid
          container
          columns={12}
          // mt={4}
          p="20px"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={6} xs={12}>
            <Typography fontSize={14} textAlign={{ md: "left", xs: "center" }}>
              Copyright © 2023 by <b>VAR META</b>. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign={{ md: "right", xs: "center" }}>
            <IconButton>
              <FacebookOutlined color="secondary" />
            </IconButton>
            <IconButton>
              <Instagram color="secondary" />
            </IconButton>
            <IconButton>
              <LinkedIn color="secondary" />
            </IconButton>
            <IconButton>
              <YouTube color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
