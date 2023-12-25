import { Markdown } from '@/components/Mardown';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { DAOForm } from '../..';
import { IGovernorField } from '@/api/governor';
import { useFormContext } from 'react-hook-form';

type Props = {
  listVotes: IGovernorField[]
}

const VoteTokenInfo = ({ listVotes }: Props) => {
  const { getValues } = useFormContext<DAOForm>();

  return (
    <Stack gap="10px">
      <Typography variant="h6">
        Vote Settings
      </Typography>

      <Stack
        direction="column"
        border="1px solid #EAECF0"
        borderRadius="5px"
        p="20px"
        gap="10px"
      >
        <Stack direction="column" gap="10px">
          {listVotes.map((token) => (
            <Stack key={token.fieldName}>
              <Typography
                key={token.id}
                variant="body1"
                style={{
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                }}
              >
                <strong>{token.fieldDescription} : </strong>
                <Stack direction="row" gap={1} justifyContent="flex-end">
                  <Typography fontWeight={500}>
                    {getValues(token.fieldName as keyof DAOForm) as string}
                  </Typography>
                </Stack>
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(VoteTokenInfo);
