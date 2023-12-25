import { IGetTopDelegateDAOParams } from "@/api/dao";
import { Close, Search } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  setParams: React.Dispatch<React.SetStateAction<IGetTopDelegateDAOParams>>;
};

const FilterControl = (props: Props) => {
  const { setParams } = props;
  const [sorts, setSorts] = useState();

  const onChangSelectSorts = (e: any) => {
    setSorts(e.target.value);
    setParams((oldParams: any) => {
      return {
        ...oldParams,
        orderBalance: +e.target.value == 1 ? 1 : undefined,
      };
    });
  };
  const onChangeSearch = (e: any) => {
    setParams((oldParams: any) => {
      return { ...oldParams, search: e.target.value.trim() };
    });
  };

  return (
    <Grid
      container
      direction="row"
      spacing="20px"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h4">Dao delegate</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="EVM or address"
          color="primary"
          onChange={onChangeSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Sort by</InputLabel>
          <Select
            value={sorts}
            size="small"
            fullWidth
            label="Sort by"
            labelId="select-label"
            onChange={onChangSelectSorts}
          >
            <MenuItem value="1">Sort by: Received delegation</MenuItem>
            <MenuItem value="0">Sort by: Random</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterControl;
