import { useGetUserInfo } from '@/api/user';
import FormWrapper from '@/form-fields/FormWrapper';
import { getIsAuthenticator } from '@/store/ducks/auth/slice';
import { getAccountByAddressOrAccountId } from '@/utils/common';
import { ContractExecuteTransaction, ContractFunctionParameters } from '@hashgraph/sdk';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@/form-fields/TextField';
import { HederaWalletsContext } from 'context/HederaContext';
import { useAppSelector } from 'hooks/useRedux';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormProps = {
  address: string;
  amount: string;
};

type Props = {
  voteToken: string;
  onClose: () => void
}

const ERC721MintForm = ({ voteToken, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });
  const { hashConnect, bladeSigner, hashConnectState } = useContext(HederaWalletsContext);

  const methods = useForm<FormProps>({
    defaultValues: {
      address: data?.wallet,
      amount: "",
    },
  });

  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    data?.accountId ?? ""
  );

  const onSubmit: SubmitHandler<FormProps> = async (formData) => {
    try {
      const voteData = await getAccountByAddressOrAccountId(voteToken);
      setLoading(true);
      const signer = hashConnect?.getSigner(provider as any);
      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(voteData.account)
        .setGas(1000000)
        .setFunction(
          "safeMint",
          new ContractFunctionParameters()
            .addAddress(formData.address)
            .addString("")
        )
        .freezeWithSigner(signer as any);

      const contractExecSign = await contractExecTx.signWithSigner(signer as any);
      const contractExecSubmit = await contractExecSign
        .executeWithSigner(signer as any)
        .catch((e) => console.log(e, "error"));
      if (contractExecSubmit?.transactionId) {
        const recept = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );

        if (recept?.status?._code === 22) {
          setLoading(false);
          onClose();
          toast.success("Mint Successfully");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("err", error);
    }
  };
  return (
    <FormWrapper methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          name="address"
          label="Address"
          size="medium"
          placeholder="Address"
        />
        <LoadingButton
          variant="contained"
          sx={{ mx: "auto", mt: 2 }}
          loading={loading}
          type="submit"
        >
          Mint
        </LoadingButton>
      </Stack>
    </FormWrapper>
  );
};

export default ERC721MintForm;