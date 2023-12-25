import { TextInput } from "@/components/TextInput";
import {
  Stack,
  TextFieldProps,
  Typography
} from "@mui/material";
import { FC, ReactNode, memo } from "react";
import { Controller } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  label?: any;
  description?: string | ReactNode;
  defaultValue?: string;
};

const TextField: FC<Props> = ({ name, defaultValue = "", label, description, ...props }) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
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
          <TextInput
            {...field}
            error={!!error?.message}
            helperText={
              error?.message ? (error?.message as string) : undefined
            }
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        </Stack>
      )}
    />
  );
};

export default memo(TextField);
