import ERC1155ABI from '@/contracts/ERC1155.json';
import ERC20ABI from '@/contracts/ERC20.json';
import ERC721ABI from '@/contracts/ERC721.json';
import SelectField from "@/form-fields/SelectField";
import TextField from "@/form-fields/TextField";
import { MenuItem, Stack } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IForm } from "../..";
import ABITypeField from "./ABITypeField";
import ABIUploadField from "./ABIUploadField";
import ParamsValueField from "./ParamsValueField";
import { FunctionABI } from '@/types/util.types';

interface Props {
  index: number;
}

export const CustomForm = ({ index }: Props) => {
  const { watch, setValue } = useFormContext<IForm>();
  const { abiType, abiContent, functionName } = watch(`arr.${index}`)

  const getFunctionsContract = useMemo(() => {
    if (!abiType || (abiType === 'other' && !abiContent)) return []
    if (abiType === 'other' && abiContent)
      return abiContent?.abi?.filter((item) => item?.type === 'function')

    switch (abiType) {
      case 'erc20':
        return ERC20ABI.abi.filter((item) => item?.type === 'function')
      case 'erc721':
        return ERC721ABI.abi.filter((item) => item?.type === 'function')
      case 'erc1155':
        return ERC1155ABI.abi.filter((item) => item?.type === 'function')
      default:
        return []
    }
  }, [abiContent, abiType]) as FunctionABI[]

  const getFunction = useMemo(() => {
    if (!getFunctionsContract || !functionName) return null;
    return getFunctionsContract?.find((item) => item.name === functionName)
  }, [functionName, getFunctionsContract])

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name={`arr.${index}.address`}
          label="Contract Address"
          placeholder="Enter the contract address"
        />
        <ABITypeField
          name={`arr.${index}.abiType`}
          label="ABI Type"
          contentName={`arr.${index}.abiContent`}
          functionName={`arr.${index}.functionName`}
        />
        {abiType === 'other' && (
          <ABIUploadField
            name={`arr.${index}.abiContent`}
            label="Select ABI File"
            description="File format: JSON"
          />
        )}
        {!!abiType && getFunctionsContract?.length !== 0 && (
          <SelectField
            name={`arr.${index}.functionName`}
            label="Function Name"
            placeholder="Select the function name"
            fullWidth
          >
            {getFunctionsContract?.map((item) => {
              return (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </SelectField>
        )}
        <ParamsValueField
          label="Arguments"
          description="The data for the function arguments you wish to send when the action executes."
          params={getFunction?.inputs || []}
          actionIndex={index}
        />
      </Stack>
    </>
  );
};
