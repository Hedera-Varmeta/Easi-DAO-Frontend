import { Radio, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { TypeGovernorStyled } from './styled';
import { IGovernorType } from '@/api/governor';
import ErrorHelper from '@/components/ErrorHelper';

type Props = {
  name: string;
  label?: ReactNode;
  defaultValue?: string;
  listGovernors: IGovernorType[]
};

const GovernorTypeField = ({ name, defaultValue = "", label, listGovernors }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
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
          <Stack direction="row" gap="20px" width="100%">
            {listGovernors.map((type) => (
              <TypeGovernorStyled
                key={type.id}
                checked={field.value === type.id}
                onClick={() => field.onChange(type.id)}
              >
                <Stack flex={1} gap="5px">
                  <Typography fontWeight="bold">
                    {type.typeName}
                  </Typography>
                  <Typography color="var(--text-des-color)" fontSize={14}>
                    {type.typeDescription}
                  </Typography>
                </Stack>
                <Radio checked={field.value === type.id} />
              </TypeGovernorStyled>
            ))}
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

export default GovernorTypeField;