import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FCC } from "@/types/util.types";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  breadcrumbs: any[];
}

export const BreadCrumbComponent: FCC<Props> = ({ breadcrumbs }) => {
  return (
    <Container maxWidth="lg" sx={{ my: "20px" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2, paddingX: 0 }}
      >
        <Link key="1" color="inherit" href="/">
          <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
            <HomeIcon sx={{ fontSize: '22px' }} color="primary" />
            <Typography fontWeight={400} fontSize={16} color="primary">
              Home
            </Typography>
          </Stack>
        </Link>
        ,{breadcrumbs}
      </Breadcrumbs>
    </Container>
  );
};
