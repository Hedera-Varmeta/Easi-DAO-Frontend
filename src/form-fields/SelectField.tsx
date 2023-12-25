import ErrorHelper from "@/components/ErrorHelper";
import { SelectStyled } from "@/components/SelectStyled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  SelectProps,
  Typography
} from "@mui/material";
import { FC, memo } from "react";
import { Controller } from "react-hook-form";

type SelectFieldProps = SelectProps & {
  name: string;
  defaultValue?: any;
  label?: any;
  formControlProps?: any;
  hideError?: boolean;
};

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  defaultValue = "",
  children,
  hideError,
  formControlProps = {},
  ...props
}) => {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...formControlProps} fullWidth>
          {label && (
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor={name}
              mb={1}
            >
              {label}
            </Typography>
          )}
          <SelectStyled
            fullWidth
            {...field}
            {...props}
            error={!!error?.message}
            IconComponent={KeyboardArrowDownIcon}
          >
            {children}
          </SelectStyled>
          <ErrorHelper message={error?.message} />
        </FormControl>
      )}
    />
  );
};

export default memo(SelectField);
