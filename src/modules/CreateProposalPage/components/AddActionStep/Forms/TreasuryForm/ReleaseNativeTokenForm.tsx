import { SMC_FUNC } from "@/utils/constants";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ArgumentName } from "../../styled";
import TextField from "@/form-fields/TextField";

const callDatas = [
  {
    value: "to",
    label: "address",
    placeholder: "Hedera address"
  },
  {
    value: "amount",
    label: "unit256",
    placeholder: "Unit256"
  },
];
interface Props {
  index: number;
}

export const ReleaseNativeTokenForm: FC<Props> = ({
  index,
}) => {
  return (
    <>
      <Typography mt={1}>
        The data for the function arguments you wish to send when the action
        executes.
      </Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          value={SMC_FUNC.RELEASE_NATIVE_TOKEN}
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
                size="small"
              />
            </Stack>
          );
        })}
        {/* <FlexBox>
            <ArgumentName>values</ArgumentName>
            <TextInput
              required
              // name={item.value}
              placeholder="values"
              defaultValue={0}
              {...register(`arr[${index}].values`)}
              fullWidth
              sx={{ display: "none" }}
            />
          </FlexBox> */}
      </Stack>
    </>
  );
};
