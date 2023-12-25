import RefetchButton from "@/components/RefetchButton/RefetchButton";
import { routeEnums } from "@/types/routes";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { memo } from "react";
import { useQueryClient } from "react-query";

const Header = () => {
  const queryClient = useQueryClient()

  const onRefetchListDao = () => {
    queryClient.invalidateQueries({ queryKey: ['/dao/my-daos'] })
  }

  return (
    <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
      <Typography variant="h4">Your DAOs</Typography>
      <Stack direction="row" alignItems="center" spacing="15px">
        <RefetchButton
          onRefetch={onRefetchListDao}
        />
        <Link href={routeEnums.createDAO}>
          <Button variant="contained" color="primary" size="large">
            Add DAO
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default memo(Header)
