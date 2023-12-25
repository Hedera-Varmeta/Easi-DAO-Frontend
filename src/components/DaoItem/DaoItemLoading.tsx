import { Box, Divider, Skeleton, Stack } from "@mui/material";

const DaoItemLoading = () => {
  return (
    <Stack
      border="1px solid #EAECF0"
      borderRadius="10px"
      p="20px"
      bgcolor="#fff"
      boxShadow="var(--box-shadow-container)"
      sx={{
        cursor: "pointer",
        backdropFilter: "blur(20px)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.078) 0px 30px 90px",
          transition: "0.3s",
        },
      }}
      gap="20px"
    >
      <Stack direction="row" alignItems="center" spacing="10px">
        <Skeleton width={40} height={40} variant="circular" />

        <Box flex={1} gap="5px">
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={50} height={20} />
        </Box>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        spacing="10px"
        justifyContent="space-around"
      >
        <Stack alignItems="center">
          <Skeleton variant="text" width={20} height={16} />
          <Skeleton variant="text" width={50} height={16} />
        </Stack>
        <Stack alignItems="center">
          <Skeleton variant="text" width={20} height={16} />
          <Skeleton variant="text" width={50} height={16} />
        </Stack>
        <Stack alignItems="center">
          <Skeleton variant="text" width={20} height={16} />
          <Skeleton variant="text" width={50} height={16} />
        </Stack>
      </Stack>
      {/* <Stack direction="row" alignItems="center" spacing="10px">
        <Skeleton variant="rounded" width={60} height={26} />
      </Stack> */}
      {/* <Skeleton variant="text" width={150} height={16} /> */}
    </Stack>
  );
};

export default DaoItemLoading;
