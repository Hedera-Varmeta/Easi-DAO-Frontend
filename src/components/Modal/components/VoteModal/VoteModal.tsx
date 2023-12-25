import {
  IProposal,
  createProposalVote,
  useGetListVoteById,
} from "@/api/proposal";
import { IError } from "@/api/types";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address";
import OverlayPage from "@/components/OverlayPage";
import FormWrapper from "@/form-fields/FormWrapper";
import TextField from "@/form-fields/TextField";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { getAccountByAddressOrAccountId } from "@/utils/common";
import { DAO_VOTE_TYPE } from "@/utils/constants";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BigNumber from "bignumber.js";
import { HederaWalletsContext } from "context/HederaContext";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useGetHashProposal } from "hooks/useGetHashProposal";
import { useGetVotingPower } from "hooks/useGetVotingPower";
import { useAppSelector } from "hooks/useRedux";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import BaseModal from "../../BaseModal";
import VoteItem from "./VoteItem";
import { ContainerProposalContent } from "./styled";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  proposal?: IProposal;
  governorAddress: string;
  daoSettingType: string;
  blockStartVote: string;
}

type FormProps = {
  comment: string;
};

export const VoteModal: FC<Props> = ({
  open,
  setOpen,
  proposal,
  governorAddress,
  daoSettingType,
  blockStartVote,
}) => {
  const [voteType, setVoteType] = useState<number>();
  const [loading, setLoading] = useState(false);
  const { getVotingPowerProposal } = useGetVotingPower();
  const [votingPower, setVotingPower] = useState(0);
  const { data: options } = useGetListVoteById({
    id: Number(proposal?.proposalVotesId || 0),
  });
  const optionInAction = useMemo(() => {
    return options?.voteOptionData.find(
      (item) => Number(item.enumSC) === voteType
    );
  }, [voteType, options]);
  const { hashConnect } = useContext(HederaWalletsContext);
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data: userInfo } = useGetUserInfo({ enabled: !!isAuthenticator });
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const res = await getVotingPowerProposal(
        100000,
        userInfo?.wallet || "",
        Number(blockStartVote),
        proposal?.governorAddress
      );
      if (daoSettingType === DAO_VOTE_TYPE.ERC20_STANDARDS)
        setVotingPower(+formatEther(BigNumber(res).toFixed()));
      else setVotingPower(Number(res));
    })();
  }, [
    daoSettingType,
    setVotingPower,
    proposal,
    userInfo,
    getVotingPowerProposal,
    blockStartVote,
  ]);

  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    userInfo?.accountId ?? ""
  );

  const { getHashPropposal } = useGetHashProposal(200000);

  const methods = useForm<FormProps>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<FormProps> = (data) => handleSubmit(data);

  // const { mutate: mutateCreateVote } = useMutation(createVote, {
  //   onSuccess: (res, request) => {
  //     mutateCreateProposalVote({
  //       voteId: Number(request.voteId),
  //       proposalId: Number(proposal?.id),
  //       voteOptionId: Number(res.id),
  //       voteAddress: userInfo?.wallet || "",
  //     });
  //   },
  //   onError: (error: IError) => {
  //     toast.error(error.meta.message);
  //     setLoading(false);
  //   },
  // });

  const { mutate: mutateCreateProposalVote } = useMutation(createProposalVote, {
    onSuccess: () => {
      toast.success("Successfully");
      setLoading(false);
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["/proposal/checked"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/proposal/all-vote-proposal"],
      });
      queryClient.invalidateQueries({
        queryKey: ["/proposal/list-vote-proposal"],
      });
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
      setLoading(false);
    },
  });

  const handleSubmit = async ({ comment }: FormProps) => {
    if (!optionInAction || voteType == undefined || !proposal) return;
    setLoading(true);

    const encodeDataUnit8Array = JSON.parse(proposal.encodeArr).map(
      (item: string) => {
        return ethers.utils.arrayify(item);
      }
    );
    const valueArray = JSON.parse(proposal.valueArr).map(
      (item: string | number) => {
        return Number(item);
      }
    );

    const hashProposal = await getHashPropposal(
      JSON.parse(proposal.addressArr),
      encodeDataUnit8Array,
      valueArray,
      ethers.utils.arrayify(
        ethers.utils.keccak256(
          // ethers.utils.toUtf8Bytes(proposal!.proposalTitle)
          ethers.utils.toUtf8Bytes(proposal.proposalTitle)
        )
      ),
      governorAddress //governor address
    );

    const signer = hashConnect?.getSigner(provider as any);

    const predictData = await getAccountByAddressOrAccountId(
      proposal?.governorAddress
    );

    const contractExecTx = await new ContractExecuteTransaction()
      .setContractId(predictData.account) // predict
      .setGas(1000000)
      .setFunction(
        "castVote",
        new ContractFunctionParameters()
          .addBytes32(hashProposal as Uint8Array)
          .addUint8(voteType)
      )
      .freezeWithSigner(signer as any);

    const contractExecSign = await contractExecTx.signWithSigner(signer as any);

    try {
      const contractExecSubmit = await contractExecSign
        .executeWithSigner(signer as any)
        .catch((e) => console.log(e, "loi"));
      if (contractExecSubmit?.transactionId) {
        const recept = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );

        if (recept?.status?._code === 22) {
          mutateCreateProposalVote({
            voteId: Number(optionInAction.voteId),
            proposalId: Number(proposal?.id),
            voteOptionId: Number(optionInAction.voteOptionId),
            voteAddress: userInfo?.wallet || "",
            voteComment: comment || null,
            votePower: String(votingPower),
          });
          // mutateCreateVote({
          //   name: optionInAction.voteOptionName,
          //   description: data.comment,
          //   voteId: Number(optionInAction.voteId),
          // });
        }
      }
    } catch (error) {
      console.log("err", error);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <OverlayPage loading={loading}>
      <BaseModal
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        title="Voting on Chain"
      >
        <Box width="100%">
          <FormWrapper methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
              <Stack gap="5px">
                <Typography variant="h6">Your EVM Address</Typography>
                <Address address={userInfo?.wallet ?? ""} />
              </Stack>
              <ContainerProposalContent>
                <Stack spacing={1}>
                  <Stack gap="5px">
                    <Typography fontWeight={600}>Voting Power:</Typography>
                    <Typography fontSize={12}>{votingPower}</Typography>
                  </Stack>
                  <Stack gap="5px">
                    <Typography fontWeight={600}>
                      Intent #1 {proposal?.proposalTitle}:{" "}
                    </Typography>
                    <Typography fontSize={12}>
                      Proposal ID: {proposal?.id ?? ""}
                    </Typography>
                  </Stack>
                </Stack>
              </ContainerProposalContent>
              <Stack gap="5px">
                <Typography variant="h6">Vote</Typography>
                <Stack direction="row" flexWrap="wrap" gap="10px">
                  {options?.voteOptionData?.map((item) => {
                    return (
                      <VoteItem
                        onClick={() => setVoteType(Number(item.enumSC))}
                        key={item.enumSC}
                        enumSC={item.enumSC}
                        voteOptionName={item.voteOptionName}
                        active={+item.enumSC === voteType}
                      />
                    );
                  })}
                </Stack>
              </Stack>

              <TextField
                fullWidth
                name="comment"
                label="Comment"
                size="medium"
                placeholder="Enter your comment"
                multiline
              />
              <LoadingButton
                variant="contained"
                loading={loading}
                type="submit"
                size="large"
                disabled={voteType === undefined}
                fullWidth
              >
                Submit
              </LoadingButton>
            </Stack>
          </FormWrapper>
        </Box>
      </BaseModal>
    </OverlayPage>
  );
};
