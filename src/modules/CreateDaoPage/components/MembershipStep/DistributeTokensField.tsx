import ErrorHelper from '@/components/ErrorHelper';
import TextField from '@/form-fields/TextField';
import { Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { DAOForm } from '../..';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  name: keyof DAOForm;
  label?: ReactNode;
  defaultValue?: string;
  governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard"
};

const DistributeTokensField = ({ name, governorSettingName, label }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DAOForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'distributeTokens'
  });

  const handleAddWallet = () => {
    append({
      address: '',
      amount: 1,
      tokenUri: ''
    })
  }

  const handleRemoveWallet = (index: number) => {
    remove(index)
  }

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {label && (
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor={name}
        >
          {label}
        </Typography>
      )}
      <Stack gap={fields.length > 0 ? "20px" : 0} width="100%">
        <Stack gap="10px" width="100%">
          {fields.map((field, index) => (
            <Container
              key={field.id}
              sx={{
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                borderRadius: "5px",
                border: '1px solid #EAECF0',
                py: "20px"
              }}
            >
              <Stack key={index} spacing={2}>
                <Grid container spacing={2}>
                  {governorSettingName === 'ERC20VotesStandard' ? (
                    <>
                      <Grid item xs={12} md={8}>
                        <TextField
                          label="Wallet address"
                          name={`${name}.${index}.address`}
                          placeholder="Enter the hedera address"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Amount"
                          name={`${name}.${index}.amount`}
                          placeholder="Enter the amount"
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Wallet address"
                          name={`${name}.${index}.address`}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Token Uri"
                          name={`${name}.${index}.tokenUri`}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Divider />
                <Stack direction="row">
                  <Button size="small" variant="contained" color="error" onClick={() => handleRemoveWallet(index)}>
                    Remove wallet
                  </Button>
                </Stack>
              </Stack>
            </Container>
          ))}
        </Stack>
        <div>
          <Button size="small" variant="contained" onClick={handleAddWallet}>Add wallet</Button>
        </div>
      </Stack>
      {errors[name]?.message &&
        <ErrorHelper
          message={errors[name]?.message as string}
        />
      }
    </Stack>
  );
};

export default DistributeTokensField;