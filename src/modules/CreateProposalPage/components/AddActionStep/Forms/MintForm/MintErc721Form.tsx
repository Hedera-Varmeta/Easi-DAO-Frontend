import TextField from "@/form-fields/TextField";
import { SMC_FUNC } from "@/utils/constants";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ArgumentName } from "../../styled";

interface Props {
  index: number;
}

const callDatas = [
  {
    value: "to",
    label: "address",
    placeholder: "Hedera address"
  },
  {
    value: "tokenUri",
    label: "string",
    placeholder: "String"
  },
];

export const MintErc721Form: FC<Props> = ({ index }) => {
  return (
    <>
      <Typography mt={1}>
        The data for the function arguments you wish to send when the action
        executes.
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          value={SMC_FUNC.MINT}
          name={`arr.${index}.type`}
          sx={{ display: "none" }}
        />
        {callDatas.map((item, i) => {
          return (
            <Stack key={item.value} direction="row">
              <ArgumentName>{item.value}</ArgumentName>
              <TextField
                placeholder={item.placeholder}
                name={`arr.${index}.data.${item.value}`}
                fullWidth
              />
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
