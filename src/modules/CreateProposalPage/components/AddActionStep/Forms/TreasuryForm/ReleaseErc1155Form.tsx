import FormWrapper from "@/form-fields/FormWrapper";
import SelectField from "@/form-fields/SelectField";
import TextField from "@/form-fields/TextField";
import { Button, MenuItem, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgumentName, FlexBox } from "../../styled";
import { Treasury__factory } from "@/contracts/types";
import { FC, useState } from "react";
import { useAppDispatch } from "hooks/useRedux";
import { setEncodeData } from "@/store/ducks/proposal/slice";
import { LoadingButton } from "@mui/lab";

const callDatas = [
  {
    value: "to",
    label: "address",
    placeholder: "Hedera address"
  },
  {
    value: "from",
    label: "address",
    placeholder: "Hedera address"
  },
  {
    value: "tokenId",
    label: "unit256",
    placeholder: "Unit256"
  },
  {
    value: "amount",
    label: "unit256",
    placeholder: "Unit256"
  },
  {
    value: "tokenAddress",
    label: "address",
    placeholder: "Hedera address"
  },
  {
    value: "data",
    label: "bytes",
    placeholder: "Bytes"
  },
];

interface Props {
  nextStep: () => void;
  previousStep: () => void;
}

interface Erc1155Params {
  to: string;
  from: string;
  tokenId: string;
  amount: string;
  tokenAddress: string;
  data: string;
}

export const ReleaseERC1155Form: FC = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<Erc1155Params>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Erc1155Params> = (data: Erc1155Params) => {
    setLoading(true);
    const treasuryGovernor = new Treasury__factory();
    const encodedFunction = treasuryGovernor.interface.encodeFunctionData(
      "releaseERC1155",
      [
        data.from,
        data.to,
        data.tokenId,
        data.amount,
        data.tokenAddress,
        data.data,
      ]
    );
    dispatch(setEncodeData({ encodeData: encodedFunction }));
    setLoading(false);
  };
  return (
    <>
      <FormWrapper methods={methods} onSubmit={onSubmit}>
        <Typography mt={1}>
          The data for the function arguments you wish to send when the action
          executes.
        </Typography>

        <Stack spacing={2} mt={2}>
          {callDatas.map((item) => {
            return (
              <FlexBox key={item.value}>
                <ArgumentName>{item.value}</ArgumentName>
                <TextField name={item.value} placeholder={item.placeholder} />
              </FlexBox>
            );
          })}
        </Stack>

        <Stack direction="row" spacing={2} mt={4}>
          <Button variant="outlined">Cancel</Button>
          <LoadingButton
            variant="contained"
            sx={{ mx: "auto", mt: 2 }}
            loading={loading}
            type="submit"
          >
            Continue
          </LoadingButton>
        </Stack>
      </FormWrapper>
    </>
  );
};
