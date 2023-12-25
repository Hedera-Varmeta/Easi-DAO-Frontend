import TextField from '@/form-fields/TextField';
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ArgumentName, FlexBox } from '../../styled';

type Props = {
  label?: string;
  description?: string | ReactNode;
  params: any[]
  actionIndex: number;
}

const ParamsValueField = ({ label, description, params, actionIndex }: Props) => {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {label && (
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
        >
          {label}
        </Typography>
      )}
      {description && typeof description === 'string' ? (
        <Typography
          fontWeight={500}
          fontSize={13}
          color="var(--text-des-color)"
          fontStyle="italic"
        >
          {description}
        </Typography>
      ) : description}
      {params.map((item) => (
        <Stack key={item.value} direction="row">
          <ArgumentName>{item.name}</ArgumentName>
          <TextField
            name={`arr.${actionIndex}.data.${item.name}`}
            placeholder={item.type}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default ParamsValueField;