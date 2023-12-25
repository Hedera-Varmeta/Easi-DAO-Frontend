import { Box, Divider, Skeleton, Stack } from '@mui/material';

const DaoItemLoading = () => {
  return (
    <Stack
      border="1px solid #EAECF0"
      borderRadius="10px"
      p="20px"
      bgcolor="#fff"
      sx={{
        cursor: 'pointer',
        backdropFilter: 'blur(20px)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 'var(--box-shadow-container)',
          transition: '0.3s',
        }
      }}
      gap="10px"
    >
      <Stack direction="row" alignItems="center" spacing="10px">
        <Skeleton
          width={40}
          height={40}
          variant="circular"
        />

        <Box flex={1} overflow="hidden">
          <Skeleton variant="text" width={150} height={20} />
        </Box>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" spacing="10px" justifyContent="space-around" py="5px">
        <div>
          <Stack alignItems="center">
            <Skeleton variant="text" width={20} height={16} />
            <Skeleton variant="text" width={50} height={16} />
          </Stack>
        </div>
        <div>
          <Stack alignItems="center">
            <Skeleton variant="text" width={20} height={16} />
            <Skeleton variant="text" width={50} height={16} />
          </Stack>
        </div>
        <div>
          <Stack alignItems="center">
            <Skeleton variant="text" width={20} height={16} />
            <Skeleton variant="text" width={50} height={16} />
          </Stack>
        </div>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="10px">
        <Skeleton variant="rounded" width={60} height={26} />
      </Stack>
      <Skeleton variant="text" width={150} height={16} />
    </Stack>
  );
};

export default DaoItemLoading;