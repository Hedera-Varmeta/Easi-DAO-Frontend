import { Markdown } from '@/components/Mardown';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { DAOForm } from '../..';
import { IGovernorField } from '@/api/governor';
import { useFormContext } from 'react-hook-form';
import { shortenAddress } from '@/utils/common';

type Props = {
  listGovernors: IGovernorField[]
}

const GovernorInfo = ({ listGovernors }: Props) => {
  const { getValues } = useFormContext<DAOForm>();

  return (
    <Stack gap="10px">
      <Typography variant="h6">
        Governor settings
      </Typography>
      <Stack
        direction="column"
        border="1px solid #EAECF0"
        borderRadius="5px"
        p="20px"
        gap="10px"
      >
        {listGovernors.map((item) => (
          <Stack key={item.fieldName} >
            <Typography
              key={item.id}
              variant="body1"
              style={{
                display: "grid",
                gridTemplateColumns: "60% 40%",
              }}
            >
              <strong>{item.fieldDescription} : </strong>
              <Stack direction="row" gap={1} justifyContent="flex-end">
                <strong>
                  {getValues(item.fieldName as keyof DAOForm) as string}
                </strong>
                <span style={{ width: "35px" }}>
                  {item?.fieldValue?.indexOf("Block") > -1
                    ? item?.fieldValue.substring(0, 5)
                    : item?.fieldValue}
                </span>
              </Stack>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(GovernorInfo);
