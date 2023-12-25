import FormWrapper from "@/form-fields/FormWrapper";
import SelectField from "@/form-fields/SelectField";
import TextField from "@/form-fields/TextField";
import { Grid, Stack, Switch, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

export const TransferTokenForm = () => {
  const methods = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <>
      <FormWrapper methods={methods} onSubmit={onSubmit}>
        <TextField
          name="targetAddress"
          label="Target wallet Address"
          placeholder="Enter the target address..."
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Value
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">Hide dust tokens?</Typography>
          <Switch />
        </Stack>
        <Typography>
          The amount of MATIC to send from the Kin treasury to the target
          address
        </Typography>
        <Grid container mt={2} mb={1}>
          <Grid item xs={4}>
            <SelectField name={"token"} sx={{ minWidth: "184px" }} />
          </Grid>
          <Grid item xs={8}>
            <TextField name="amount" />
          </Grid>
        </Grid>

        <Typography sx={{ marginBottom: 2 }}>
          1 MATIC = 0.78/ Kin Treasury
        </Typography>
        <TextField
          name="memo"
          label="Memo"
          placeholder="Enter the transfer memo"
        />
      </FormWrapper>
    </>
  );
};
