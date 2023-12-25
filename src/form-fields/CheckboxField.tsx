import { CheckBoxStyled } from '@/components/CheckBoxStyled';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { FC, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type CheckBoxFieldProps = CheckboxProps & {
  name: string;
  label: any;
  defaultValue?: boolean;
  className?: string;
};

const CheckboxField: FC<CheckBoxFieldProps> = ({ className, name, label, defaultValue = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      className={className}
      control={
        <Controller
          defaultValue={defaultValue}
          control={control}
          name={name}
          render={({ field }) => (
            <CheckBoxStyled {...field} checked={field.value} {...props} />
          )}
        />
      }
      label={label}
    />
  );
};

export default memo(CheckboxField);
