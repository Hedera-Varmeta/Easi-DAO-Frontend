import { useGetUserInfo } from "@/api/user";
import BaseModal from "@/components/Modal/BaseModal";
import OverlayPage from "@/components/OverlayPage";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { getAccountByAddressOrAccountId } from "@/utils/common";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters
} from "@hashgraph/sdk";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Typography
} from "@mui/material";
import { HederaWalletsContext } from "context/HederaContext";
import { ethers } from "ethers";
import { useAppSelector } from "hooks/useRedux";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  encodeArr: string;
  addressArr: string;
  valuesArr: string;
  governorAddress: string;
  proposalTitle: string;
}

export const QueueModal: FC<Props> = ({
  encodeArr,
  addressArr,
  valuesArr,
  governorAddress,
  proposalTitle,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });

  const { hashConnect } = useContext(HederaWalletsContext);
  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    userInfo?.accountId ?? ""
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleQueue = async () => {
    try {
      setLoading(true);
      const signer = hashConnect?.getSigner(provider as any);

      // const voteData = await getAccountByAddressOrAccountId(proposal?.voteToken);

      // const client = Client.forTestnet();
      // client.setOperator(
      //   AccountId.fromString(ACCOUNT_ID),
      //   PrivateKey.fromString(PRIVATE_KEY)
      // );
      const encodeDataUnit8Array = JSON.parse(encodeArr).map((item: string) => {
        return ethers.utils.arrayify(item);
      });

      const valueArray = JSON.parse(valuesArr).map((item: string | number) => {
        return Number(item);
      });

      const governorData = await getAccountByAddressOrAccountId(governorAddress);
      const queueTx = await new ContractExecuteTransaction()
        .setContractId(governorData.account) // treasury address
        .setGas(1000000)
        .setFunction(
          "queue",
          new ContractFunctionParameters()
            .addAddressArray(JSON.parse(addressArr))
            .addUint256Array(valueArray)
            .addBytesArray(encodeDataUnit8Array)
            .addBytes32(
              ethers.utils.arrayify(
                ethers.utils.keccak256(
                  ethers.utils.toUtf8Bytes(proposalTitle ?? "")
                )
              )
            )
        )
        .freezeWithSigner(signer as any);
      const contractExecSign1 = await queueTx.signWithSigner(signer as any);
      const contractExecSubmit = await contractExecSign1
        .executeWithSigner(signer as any)
        .catch((e) => {
          console.log(e, "loi");
          setLoading(false);
        });
      if (contractExecSubmit?.transactionId) {
        const recept1 = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );
        if (recept1?.status?._code === 22) {
          toast.success("Queue Successfully");
          setLoading(false);
          handleClose();
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <OverlayPage loading={loading}>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Queue
      </Button>
      <BaseModal
        open={open}
        onClose={handleClose}
        title="Queue Proposal"
      >
        <Box flex={1} display="flex" alignItems="center" width="100%" justifyContent="center">
          <Typography textAlign="center">
            Do you want to queue this proposal?
          </Typography>
        </Box>

        <LoadingButton
          variant="contained"
          onClick={handleQueue}
          loading={loading}
          size="large"
          fullWidth
        >
          Queue
        </LoadingButton>
      </BaseModal>
    </OverlayPage>
  );
};
