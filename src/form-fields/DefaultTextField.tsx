/* eslint-disable react/jsx-no-duplicate-props */
import { TextFieldProps, TextField as TextFieldMui } from "@mui/material";
import { FC, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  label?: any;
  defaultValue?: string;
};

const DefaultTextField: FC<Props> = ({ name, defaultValue = "", ...props }) => {
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
        <TextFieldMui
          {...field}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as string) : undefined
          }
          InputLabelProps={{ shrink: true }}
          {...props}
        />
      )}
    />
  );
};

export default memo(DefaultTextField);
