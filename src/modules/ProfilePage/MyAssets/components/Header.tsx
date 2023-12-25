import { Button, Stack, Typography } from '@mui/material';

type Props = {
}

const Header = ({ }: Props) => {
  return (
    <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
      <Typography variant="h4">My Assets</Typography>
    </Stack>
  );
};

export default Header;