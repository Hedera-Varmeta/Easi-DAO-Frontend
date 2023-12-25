import {
  Box,
  Stack,
  Typography
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AbiTypeStyled } from "./styled";

import ERC20ABI from '@/contracts/ERC20.json'
import ERC721ABI from '@/contracts/ERC721.json'
import ERC1155ABI from '@/contracts/ERC1155.json'
import ErrorHelper from "@/components/ErrorHelper";

type Props = {
  name: string;
  contentName: string;
  functionName: string;
  label?: any;
  defaultValue?: string;
}

const abiTypes = [
  { name: "ERC20", type: "erc20", abi: ERC20ABI },
  { name: "ERC721", type: "erc721", abi: ERC721ABI },
  { name: "ERC1155", type: "erc1155", abi: ERC1155ABI },
  { name: "Other", type: "other", abi: null },
]

const ABITypeField = ({ name, contentName, functionName, defaultValue = "", label }: Props) => {
  const { setValue } = useFormContext()

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
          <Stack direction="row" gap="10px">
            {abiTypes.map((typeItem) => (
              <AbiTypeStyled
                key={typeItem.type}
                active={field.value === typeItem.type}
                onClick={() => {
                  field.onChange(typeItem.type)
                  setValue(contentName, typeItem.abi)
                  setValue(functionName, '')
                }}
              >
                {typeItem.name}
              </AbiTypeStyled>
            ))}
          </Stack>
          <ErrorHelper message={error?.message} />
        </Stack>
      )}
    />
  );
};

export default ABITypeField;