import { Search } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import debounce from "@mui/material/utils/debounce";
import { FilterExploredDaoPage } from "..";

type Props = {
  onFilterChange: <TKey extends keyof FilterExploredDaoPage>(
    key: TKey,
    value: FilterExploredDaoPage[TKey]
  ) => void;
};

export const Header = (props: Props) => {
  const { onFilterChange } = props;

  const onChangeDaoName = (e: any) => {
    onFilterChange("daoName", e.target.value);
  };

  const debouncedOnChange = debounce(onChangeDaoName, 500);

  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="space-between"
      paddingY={3}
      alignItems="center"
    >
      <Typography variant="h4">Explore DAOs</Typography>
      <Stack direction="row" width={250}>
        <FormControl fullWidth>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter DAO name"
            color="primary"
            onChange={debouncedOnChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};
