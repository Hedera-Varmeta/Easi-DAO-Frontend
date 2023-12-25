import { IGovernorSetting } from '@/api/governor';
import { Radio, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { TypeGovernorStyled } from './styled';
import ErrorHelper from '@/components/ErrorHelper';

type Props = {
  name: string;
  label?: ReactNode;
  defaultValue?: string;
  governorSettings: IGovernorSetting[]
};

const GovernorVoteTokenField = ({ name, defaultValue = "", label, governorSettings }: Props) => {
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
            {governorSettings.map((setting) => (
              <TypeGovernorStyled
                key={setting.id}
                checked={field.value === setting.id}
                onClick={() => field.onChange(setting.id)}
              >
                <Stack flex={1} gap="5px">
                  <Typography fontWeight="bold">
                    {setting.settingName}
                  </Typography>
                  <Typography color="var(--text-des-color)" fontSize={14}>
                    {setting.settingDescription}
                  </Typography>
                </Stack>
                <Radio checked={field.value === setting.id} />
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

export default GovernorVoteTokenField;