import { TextInput } from "@/components/TextInput";
import {
  Stack,
  TextFieldProps,
  Typography
} from "@mui/material";
import { FC, ReactNode, memo } from "react";
import { Controller } from "react-hook-form";
import { TypeItemStyled } from "./styled";
import { ITypeTreasury } from "@/api/dao";
import ErrorHelper from "@/components/ErrorHelper";

type Props = {
  name: string;
  label?: any;
  description?: string | ReactNode;
  defaultValue?: string;
  types: ITypeTreasury[]
  onChange: (value: ITypeTreasury) => void;
};

const TypeField = ({ name, defaultValue = "", label, description, types, onChange }: Props) => {
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

          <Stack direction="row" width="100%" gap="10px" flexWrap="wrap">
            {types.map(typeItem => (
              <TypeItemStyled
                key={typeItem.id}
                active={field.value === typeItem.id}
                onClick={() => {
                  field.onChange(typeItem.id)
                  onChange(typeItem)
                }}
              >
                {typeItem.typeName}
              </TypeItemStyled>
            ))}
          </Stack>


          {error?.message &&
            <ErrorHelper
              message={error?.message as string}
            />
          }
        </Stack>
      )}
    />
  );
};

export default TypeField;