import { FC, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Select,
  SelectProps,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { SelectStyled } from "@/components/SelectStyled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RadioStyled } from "@/components/RadioStyled";

type RadioOption = {
  value: any;
  label: string;
};

type RadioGroupField = SelectProps & {
  name: string;
  defaultValue?: any;
  label?: any;
  options: RadioOption[];
  formControlProps?: any;
};

const RadioGroupField: FC<RadioGroupField> = ({
  name,
  label,
  defaultValue = "",
  options,
  children,
  formControlProps = {},
  ...props
}) => {
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
        <FormControl {...formControlProps}>
          <RadioGroup
            {...field}
            onChange={(e, value) => {
              console.log(value)
              field.onChange(value)
            }}
          >
            {options?.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<RadioStyled />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default memo(RadioGroupField);
