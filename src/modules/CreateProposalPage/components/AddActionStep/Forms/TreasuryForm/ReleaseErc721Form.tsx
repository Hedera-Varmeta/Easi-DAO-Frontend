import TextField from "@/form-fields/TextField";
import { SMC_FUNC } from "@/utils/constants";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ArgumentName, FlexBox } from "../../styled";

interface Props {
  index: number;
}

const callDatas = [
  {
    value: "to",
    label: "address",
    placeholder: "Hedera address"
  },
  // {
  //   value: "from",
  //   label: "address",
  // },
  {
    value: "tokenId",
    label: "unit256",
    placeholder: "Unit256"
  },
  {
    value: "tokenAddress",
    label: "address",
    placeholder: "Hedera address"
  },
];

export const ReleaseERC721Form: FC<Props> = ({ index }) => {
  return (
    <>
      <Typography mt={1}>
        The data for the function arguments you wish to send when the action
        executes.
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          value={SMC_FUNC.RELEASE_ERC721}
          name={`arr.${index}.type`}
          sx={{ display: "none" }}
        />
        {callDatas.map((item) => {
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
        <FlexBox>
          <ArgumentName>from</ArgumentName>
          <TextField
            required
            // name={item.value}
            placeholder="string"
            // value={treasuryAddress}
            name={`arr.${index}.data.from`}
            fullWidth
            disabled
          />
        </FlexBox>
        {/* <FlexBox>
          <ArgumentName>tokenAddress</ArgumentName>
          <TextField
            required
            // name={item.value}
            placeholder="string"
            // value={voteTokenAddress}
            name={`arr.${index}.data.tokenAddress`}
            fullWidth
            disabled
          />
        </FlexBox> */}
      </Stack>
    </>
  );
};
