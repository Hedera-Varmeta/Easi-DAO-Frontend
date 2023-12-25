import * as yup from 'yup';

export type TransferAssetForm = {
  to: string;
  amount: number;
}

export const getFormTransferAssetSchema = yup.object({
  to: yup.string().required().trim().label('To Address'),
  amount: yup.number().required()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .label('Amount'),
})
