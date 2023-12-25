import { IGovernorField } from '@/api/governor';
import TextField from '@/form-fields/TextField';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import DistributeTokensField from './DistributeTokensField';

type Props = {
  listVotes: IGovernorField[]
  governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard"
}

const MintToken = ({ listVotes, governorSettingName }: Props) => {
  return (
    <Stack gap="20px">
      <Typography variant="h4">
        Mint your token
      </Typography>
      <Stack gap="20px">
        {listVotes.map((tokenField) => (
          <TextField
            name={tokenField.fieldName}
            label={tokenField.fieldDescription}
            key={tokenField.id}
            placeholder={`Enter the ${tokenField.fieldDescription}`}
          />
        ))}
      </Stack>
      <DistributeTokensField
        name="distributeTokens"
        label="Distribute Tokens"
        governorSettingName={governorSettingName}
      />
    </Stack>
  );
};

export default MintToken;