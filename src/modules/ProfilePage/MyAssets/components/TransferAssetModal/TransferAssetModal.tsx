import BaseModal from '@/components/Modal/BaseModal';
import OverlayPage from '@/components/OverlayPage/OverlayPage';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TransferAssetForm, getFormTransferAssetSchema } from './FormTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from '@/form-fields/FormWrapper';
import TextField from '@/form-fields/TextField';
import { Button, Stack } from '@mui/material';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TransferAssetModal = ({
  open,
  setOpen,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<TransferAssetForm>({
    resolver: yupResolver(getFormTransferAssetSchema),
  });

  const onClose = () => {
    setOpen(false);
    methods.reset();
  }

  const onSubmit = (data: TransferAssetForm) => { }

  return (
    <div>
      <OverlayPage loading={loading}>
        <BaseModal
          open={open}
          onClose={onClose}
          maxWidth="xs"
          title="Transfer Asset"
        >
          <FormWrapper methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
              <TextField
                name="to"
                label="To address"
                placeholder="Enter the to address"
              />

              <TextField
                name="amount"
                label="Amount"
                placeholder="Enter the amount to transfer"
              />

              <Button variant="contained" size="large" type="submit">
                Transfer
              </Button>
            </Stack>
          </FormWrapper>
        </BaseModal>
      </OverlayPage>
    </div>
  );
};

export default TransferAssetModal;