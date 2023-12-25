import { IDAODetailResponse, createDelegate } from "@/api/dao";
import { IError } from "@/api/types";
import { ILoginResponse } from "@/api/user";
import FormWrapper from "@/form-fields/FormWrapper";
import TextField from "@/form-fields/TextField";
import {
  convertToEvmAddress,
  getAccountByAddressOrAccountId,
} from "@/utils/common";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { HederaWalletsContext } from "context/HederaContext";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import BaseModal from "./BaseModal";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  DAO?: IDAODetailResponse;
  userInfo?: ILoginResponse;
  balance: string | number;
}

type FormProps = {
  address: string;
  amount: string;
};

const DelegateModal: FC<Props> = ({
  open,
  setOpen,
  DAO,
  userInfo,
  balance,
}) => {
  const [type, setType] = useState<string>("");
  const [selfLoading, setSelfLoading] = useState<boolean>(false);
  const [elseLoading, setElseLoading] = useState<boolean>(false);
  const onClose = () => {
    setLoading(false);
    setSelfLoading(false);
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const { hashConnect, bladeSigner, hashConnectState } =
    useContext(HederaWalletsContext);

  const methods = useForm<FormProps>({
    defaultValues: {
      address: "",
      amount: "",
    },
  });

  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    userInfo?.accountId ?? ""
  );

  const queryClient = useQueryClient();
  const { mutate: mutateCreateDelegate } = useMutation(createDelegate, {
    onSuccess: () => {
      toast.success("Successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["/dao/top-delegate"] });
      queryClient.invalidateQueries({ queryKey: ["/dao/check-delegate"] });
      queryClient.invalidateQueries({ queryKey: ["/dao/received-delegate"] });
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
      onClose();
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) =>
    handleDelegate(data?.address);

  const handleDelegate = async (address: string) => {
    if (!DAO || !address) return;
    setLoading(true);
    const signer = hashConnect?.getSigner(provider as any);

    const voteData = await getAccountByAddressOrAccountId(DAO?.voteToken);
    const contractExecTx1 = await new ContractExecuteTransaction()
      .setContractId(voteData.account) // vote address
      .setGas(1000000)
      .setFunction(
        "delegate",
        new ContractFunctionParameters().addAddress(
          convertToEvmAddress(address) || ""
        )
      )
      .freezeWithSigner(signer as any);
    const contractExecSign1 = await contractExecTx1.signWithSigner(
      signer as any
    );
    try {
      const contractExecSubmit = await contractExecSign1
        .executeWithSigner(signer as any)
        .catch((e) => console.log(e, "loi"));
      if (contractExecSubmit?.transactionId) {
        const recept1 = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );
        if (recept1?.status?._code === 22) {
          mutateCreateDelegate({
            balance: String(balance),
            daoId: DAO?.id,
            toAddress: convertToEvmAddress(address),
          });
        }
      }
    } catch (error) {
      console.log("err", error);
    }
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={() => setOpen(false)}
      title="Delegate voting power"
    >
      <Box width="100%">
        {type === "" && (
          <Stack gap={2}>
            <LoadingButton
              variant="outlined"
              onClick={() => {
                setSelfLoading(true);
                handleDelegate(String(userInfo?.accountId));
              }}
              loading={selfLoading}
            >
              Myself
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              onClick={() => setType("else")}
              disabled={selfLoading}
            >
              Someone Else
            </LoadingButton>
          </Stack>
        )}
        {type === "else" && (
          <FormWrapper methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                size="medium"
                placeholder="Hedera address"
              />
              {/* <TextField
                fullWidth
                name="amount"
                label="Amount"
                size="medium"
                placeholder="Amount"
                type="number"
              /> */}
              <LoadingButton
                sx={{ mx: "auto", mt: 2 }}
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
              >
                Delegate
              </LoadingButton>
              {/* <Divider /> */}
              {/* <Link href={""}> */}
              {/* <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Explore all Delegates{" "}
                <ArrowForwardIcon sx={{ fontSize: 16, marginLeft: 0.5 }} />
              </Typography> */}
              {/* </Link> */}
            </Stack>
          </FormWrapper>
        )}
      </Box>
    </BaseModal>
  );
};

export default DelegateModal;
