import { SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import * as yup from 'yup';

import ERC20ABI from '@/contracts/ERC20.json'
import ERC721ABI from '@/contracts/ERC721.json'
import ERC1155ABI from '@/contracts/ERC1155.json'

import { DataAction, FunctionABI, InputFunctionABI, TContentABI } from "@/types/util.types";

export const getFormProposalInfoSchema = yup
  .object({
    proposalTitle: yup.string().trim().max(255).label("Title").required(),
    proposalDescription: yup.string().trim().label("Description").required(),
    image: yup.mixed(),
  })

const typeMappings: any = {
  address: yup.string().label('address').required().length(42),
  bool: yup.boolean().label('bool').required(),
  uint: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint').required(),
  int: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int').required(),
  string: yup.string().label('string').label('string').required(),
  bytes: yup
    .string()
    .trim()
    .label('bytes').required()
    .test('is-hex', '${path} must be a valid hexadecimal string', (value) =>
      /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
    ),
  bytes32: yup
    .string()
    .trim()
    .label('bytes32').required()
    .test('is-hex', '${path} must be a valid hexadecimal string', (value) =>
      /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
    ),
  bytes64: yup
    .string()
    .trim()
    .label('bytes64').required()
    .test('is-hex', '${path} must be a valid hexadecimal string', (value) =>
      /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
    ),
  bytes128: yup
    .string()
    .trim()
    .label('bytes128').required()
    .test('is-hex', '${path} must be a valid hexadecimal string', (value) =>
      /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
    ),
  bytes256: yup
    .string()
    .trim()
    .label('bytes256').required()
    .test('is-hex', '${path} must be a valid hexadecimal string', (value) =>
      /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
    ),
  uint8: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint8').required(),
  uint16: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint16').required(),
  uint32: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint32').required(),
  uint64: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint64').required(),
  uint128: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('uint128').required(),
  uint256: yup.number()
    .label('uint256')
    .transform((value) => (Number.isNaN(value) ? undefined : value)).required(),
  int8: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int8').required(),
  int16: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int16').required(),
  int32: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int32').required(),
  int64: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int64').required(),
  int128: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int128').required(),
  int256: yup.number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('int256').required(),
};

export const getFormActionsSchema: any = yup
  .object({
    arr: yup.array()
      .of(
        yup.object({
          type: yup.string<SMC_FUNC>().trim(),
          // address: yup.string().trim()
          //   .when('type', ([type], schema) => type !== SMC_FUNC.CUSTOM ? schema.required() : schema),
          tokenType: yup.string<TOKEN_TYPE>().trim()
            .when('type', ([type], schema) => type !== SMC_FUNC.CUSTOM ? schema.required() : schema),
          values: yup.string()
            .when('type', ([type], schema) => type !== SMC_FUNC.CUSTOM ? schema.required() : schema),
          abiType: yup.string()
            .label('ABI Type')
            .when('type', ([type], schema) => type === SMC_FUNC.CUSTOM ? schema.required() : schema),
          abiContent: yup.object<TContentABI>()
            .when(['type'], ([type], schema) => type === SMC_FUNC.CUSTOM
            ? yup.object({
              abi: yup.array(),
              contractName: yup.string().required()
            }).required()
            : schema),
          functionName: yup.string()
            .label('Function Name')
            .when('type', ([type], schema) => type === SMC_FUNC.CUSTOM ? schema.required() : schema),
          address: yup.string()
            .required()
            .when('type', ([type], schema) => type === SMC_FUNC.CUSTOM ? schema.label('Contract Address') : schema.label('Address')),
          data: yup.object<DataAction>()
            .when(
              ['type', 'tokenType', 'abiType', 'abiContent', 'functionName'],
              ([type, tokenType, abiType, abiContent, functionName], schema) => {
                if (type === SMC_FUNC.RELEASE_ERC20) {
                  return yup.object({
                    to: yup.string().trim().required().label('To address'),
                    amount: yup.number()
                      .label('Amount')
                      .transform((value) => (Number.isNaN(value) ? undefined : value))
                      .moreThan(0)
                      .required(),
                    tokenAddress: yup.string().trim().label('Token address').required()
                  }).defined();
                }
                if (type === SMC_FUNC.RELEASE_ERC721) {
                  return yup.object({
                    to: yup.string().trim().required().label('To address'),
                    from: yup.string().trim().required().label('From address'),
                    tokenId: yup.number()
                      .label('Token Id')
                      .integer()
                      .transform((value) => (Number.isNaN(value) ? undefined : value))
                      .moreThan(0)
                      .required(),
                    tokenAddress: yup.string().trim().label('Token address').required()
                  }).defined();
                }
                if (type === SMC_FUNC.MINT && tokenType === TOKEN_TYPE.ERC20) {
                  return yup.object({
                    to: yup.string().trim().required().label('To address'),
                    amount: yup.number()
                      .label('Amount')
                      .transform((value) => (Number.isNaN(value) ? undefined : value))
                      .moreThan(0)
                      .required(),
                  }).defined();
                }
                if (type === SMC_FUNC.MINT && tokenType === TOKEN_TYPE.ERC721) {
                  return yup.object({
                    to: yup.string().trim().required().label('To address'),
                    token: yup.string().trim().label('Token').required()
                  }).defined();
                }
                if (type === SMC_FUNC.RELEASE_NATIVE_TOKEN) {
                  return yup.object({
                    to: yup.string().trim().required().label('To address'),
                    amount: yup.number()
                      .label('Amount')
                      .transform((value) => (Number.isNaN(value) ? undefined : value))
                      .moreThan(0)
                      .required(),
                  }).defined();
                }
                if (type === SMC_FUNC.CUSTOM) {
                  let schemaFields = {}
                  let inputTypes = (() => {
                    if (!abiType || (abiType === 'other' && !abiContent)) return []
                    if (abiType === 'other' && abiContent)
                      return abiContent?.abi?.find((item: FunctionABI) => item?.type === 'function' && item.name === functionName)

                    switch (abiType) {
                      case 'erc20':
                        return ERC20ABI.abi.find((item) => item?.type === 'function' && item.name === functionName)
                      case 'erc721':
                        return ERC721ABI.abi.find((item) => item?.type === 'function' && item.name === functionName)
                      case 'erc1155':
                        return ERC1155ABI.abi.find((item) => item?.type === 'function' && item.name === functionName)
                      default:
                        return null
                    }
                  })()

                  if (!!inputTypes && inputTypes?.inputs) {
                    schemaFields = inputTypes?.inputs?.reduce((fields: any, input: InputFunctionABI) => {
                      const fieldKey = input?.name;
                      const validationMethod = typeMappings[input?.type as any];
                      if (!validationMethod) {
                        throw new Error(`Unsupported data type "${input?.type}" in the ABI.`);
                      }
                      fields[fieldKey] = validationMethod;
                      return fields;
                    }, {});
                    return yup.object(schemaFields)
                  }
                  return schema.defined();
                }
                return schema.defined();
              })
        })
      )
      .max(10)
      .label("Actions")
      .required(),
  });