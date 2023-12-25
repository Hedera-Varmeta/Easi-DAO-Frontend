import ErrorHelper from "@/components/ErrorHelper";
import { Markdown } from "@/components/Mardown";
import {
  Stack,
  Typography
} from "@mui/material";
import { FC, ReactNode, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: any;
  description?: string | ReactNode;
  defaultValue?: string;
};

const MarkdownField: FC<Props> = ({ name, defaultValue = "", label, description, ...props }) => {
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
          <Markdown
            {...field}
            // onChange={(newValue?: string | undefined, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => field.onChange(newValue)}
            // error={!!errors[name]}
            // helperText={
            //   errors[name] ? (errors[name]?.message as string) : undefined
            // }
            {...props}
            className={!!errors[name] ? "error" : ''}
          />
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

export default memo(MarkdownField);
