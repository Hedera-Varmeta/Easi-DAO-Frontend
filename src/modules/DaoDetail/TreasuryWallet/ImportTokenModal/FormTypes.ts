import { TOKEN_TYPE } from '@/utils/constants';
import * as yup from 'yup';

export const getFormTokenImportSchema: any = yup
  .object({
    arr: yup.array(
      yup.object({
        treasuryType: yup.string(),
        daoId: yup.number().required().label('DAO ID')
          .transform((value) => (Number.isNaN(value) ? undefined : value)),
        typeId: yup.number().nonNullable().required().label('Treasury Type')
          .transform((value) => (Number.isNaN(value) ? undefined : value)),
        token: yup.string().trim().required().label('Token Address')
          .test('is-hex', '${path} must be a valid address', (value) =>
            /^0x([0-9A-Fa-f])*$/g.test(value ?? '')
          ),
        tokenName: yup.string().trim().required().max(20).label('Token Name'),
        tokenId: yup.number()
          .transform((value) => (Number.isNaN(value) ? undefined : value))
          .when(['treasuryType'], {
            is: TOKEN_TYPE.ERC1155,
            then: (schema) => schema.required()
          })
          .label('Token ID')
      })
    )
      .label("Token import")
      .min(1)
      .required()
  });