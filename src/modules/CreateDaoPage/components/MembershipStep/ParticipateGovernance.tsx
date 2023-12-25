import React, { ReactNode } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { Stack, Typography } from '@mui/material';
import ParticipateItem from './ParticipateItem';
import ErrorHelper from '@/components/ErrorHelper';

type Props = {
  name: string;
  label?: ReactNode;
  defaultValue?: string;
};

const ParticipateGovernance = ({ name, label }: Props) => {
  return (
    <Controller
      name={name}
      render={({ field, formState: { errors } }) => (
        <Stack spacing={1} sx={{ width: "100%" }}>
          {label && (
            <Typography
              color="primary"
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor={name}
            >
              {label}
            </Typography>
          )}
          <Stack direction="column" gap="20px">
            <ParticipateItem
              name='Token holders'
              des='Tokens act as voting chips. The more tokens you hold, the more weight your vote has. 1 token equals 1 vote.'
              checked={field.value === "tokenHolders"}
              onClick={() => field.onChange("tokenHolders")}
            />
            {/* <ParticipateItem
              name='Multisig members'
              des='Only multisig members can vote. 1 wallet address equals 1 approval.'
              checked={field.value === "multisigMembers"}
              onClick={() => field.onChange("multisigMembers")}
              disabled
            /> */}
          </Stack>
          {errors[name]?.message &&
            <ErrorHelper
              message={errors[name]?.message as string}
            />
          }
        </Stack>
      )}
    />
  );
};

export default ParticipateGovernance;