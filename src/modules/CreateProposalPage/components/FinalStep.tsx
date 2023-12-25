import { IDAODetailResponse } from "@/api/dao";

import { createProposal } from "@/api/proposal";
import { IError } from "@/api/types";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address";
import Avatar from "@/components/Avatar";
import Description from "@/modules/ProposalDetail/component/Description";
import { ActionItem } from "@/modules/ProposalDetail/component/Detail";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import {
  getProposal,
  resetProposalData,
  setProposalInfo,
} from "@/store/ducks/proposal/slice";
import { routeEnums } from "@/types/routes";
import { FunctionABI } from "@/types/util.types";
import {
  convertToEvmAddress,
  getAccountByAddressOrAccountId,
} from "@/utils/common";
import { PARAMS_DEFINE, SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import BigNumber from "bignumber.js";
import { HederaWalletsContext } from "context/HederaContext";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEncodeFunction } from "hooks/useEncodeFunction";
import { useGetHashProposal } from "hooks/useGetHashProposal";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import {
  Dispatch,
  Ref,
  SetStateAction,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { RefValidateProposal } from "..";

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  DAO?: IDAODetailResponse;
};

const FinalStep = (
  { setLoading, DAO }: Props,
  ref: Ref<RefValidateProposal>
) => {
  const { hashConnect, bladeSigner, hashConnectState } =
    useContext(HederaWalletsContext);
  const { getEncodeFunction, getEncodeFunctionCustomAbi } = useEncodeFunction();

  const { getHashPropposal } = useGetHashProposal(1000000);
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const dispatch = useAppDispatch();
  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });
  const router = useRouter();
  const { id } = router.query;

  const { mutate } = useMutation(createProposal, {
    onSuccess: (data: any, request) => {
      toast.dismiss();
      toast.success("Successfully");
      dispatch(resetProposalData());
      router.push(
        `${routeEnums.detailDAO}?id=${id}&governorId=${DAO?.governorId}`
      );
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const proposal = useAppSelector(getProposal);

  const handleCreateProposal = (
    proposalId: string,
    encodeArr: string,
    valuesArr: number[],
    addressArr: string[],
    actionData: string
  ) => {
    // const valuesArr = proposal.actionsData.map((item) => {
    //   return Number(item.values);
    // });
    // const addressArr = proposal.actionsData.map((item) => {
    //   return item.address;
    // });

    mutate({
      proposalTitle: proposal.title,
      proposalDescription: proposal.description,
      proposalStatus: "active",
      daoId: Number(DAO?.id),
      addressArr: JSON.stringify(addressArr),
      valueArr: JSON.stringify(valuesArr),
      // encodeArr: JSON.stringify(proposal.encodeData),
      encodeArr: encodeArr,
      data: actionData,
      image: proposal?.image,
      proposalId: proposalId,
    });
    dispatch(setProposalInfo({ ...proposal, image: undefined }));
  };

  const getInputFunction = (abi: FunctionABI[], functionName: string) => {
    return (
      abi.find((item) => item.type === "function" && item.name === functionName)
        ?.inputs ?? []
    ).map((item) => item.name);
  };

  const onSubmit = async () => {
    if (!proposal) return;
    const handleActionData = [...proposal?.actionsData];
    if (handleActionData.length === 0) {
      handleActionData.push({
        address: String(DAO?.predictTreasury),
        type: SMC_FUNC.NO_ACTION,
        values: 0,
        tokenType:
          DAO?.governorSettingName === "ERC20VotesStandard"
            ? TOKEN_TYPE.ERC20
            : TOKEN_TYPE.ERC721,
        data: {
          from: data?.wallet,
        },
      });
    }

    // CONVERT AMOUNT TO DECIMAL IF ERC20: 18 , NATIVE: 8, ERC721 : 0
    const dataAmountDecimalConvert = handleActionData.map((item) => {
      if (item.type === SMC_FUNC.CUSTOM || item.type === SMC_FUNC.NO_ACTION) {
        const handleItem = { ...item };
        return handleItem;
      }
      if (!item.data.amount) {
        const handleItem = { ...item };
        handleItem.data = {
          ...handleItem.data,
          from: item.data.from ? convertToEvmAddress(item.data.from) : "",
          to: item.data.to ? convertToEvmAddress(item.data.to) : "",
          token: item.data.token ? convertToEvmAddress(item.data.token) : "",
          tokenAddress: item.data.tokenAddress
            ? convertToEvmAddress(item.data.tokenAddress)
            : "",
        };
        return handleItem;
      }
      if (item.tokenType === TOKEN_TYPE.NATIVE) {
        const handleItem = { ...item };
        handleItem.data = {
          ...handleItem.data,
          from: convertToEvmAddress(item.data.from),
          to: convertToEvmAddress(item.data.to),
          token: convertToEvmAddress(item.data.token),
          tokenAddress: convertToEvmAddress(item.data.tokenAddress),
          amount: parseUnits(
            BigNumber(item.data.amount as number).toFixed(),
            8
          ).toString(),
        };
        return handleItem;
      }
      if (item.tokenType === TOKEN_TYPE.ERC20) {
        const handleItem = { ...item };
        handleItem.data = {
          ...handleItem.data,
          from: convertToEvmAddress(item.data.from),
          to: convertToEvmAddress(item.data.to),
          token: convertToEvmAddress(item.data.token),
          tokenAddress: convertToEvmAddress(item.data.tokenAddress),
          amount: parseUnits(
            BigNumber(item.data.amount as number).toFixed(),
            18
          ).toString(),
        };

        return handleItem;
      }

      return item;
    });

    //GET ENCODE DATA ARR
    let encodeDataArr = dataAmountDecimalConvert.map((item: any) => {
      let paramsDefineArr: string[] = [];
      switch (item.type) {
        case SMC_FUNC.NO_ACTION:
          paramsDefineArr = ["from"];
          break;
        case SMC_FUNC.RELEASE_ERC20: {
          paramsDefineArr = PARAMS_DEFINE.releaseErc20;
          break;
        }
        case SMC_FUNC.RELEASE_ERC721: {
          paramsDefineArr = PARAMS_DEFINE.releaseErc721;
          break;
        }
        case SMC_FUNC.MINT: {
          if (item.tokenType === TOKEN_TYPE.ERC20)
            paramsDefineArr = PARAMS_DEFINE.mintErc20;
          else if (item.tokenType === TOKEN_TYPE.ERC721)
            paramsDefineArr = PARAMS_DEFINE.mintErc721;
          break;
        }
        case SMC_FUNC.RELEASE_NATIVE_TOKEN: {
          paramsDefineArr = PARAMS_DEFINE.releaseNativeToken;
          break;
        }
        case SMC_FUNC.CUSTOM:
          paramsDefineArr = getInputFunction(
            item?.abiContent?.abi ?? [],
            item?.functionName
          );
          break;
        default: {
          //statements;
          break;
        }
      }

      //Arr params data follow define
      const paramsArr = paramsDefineArr.map((param) => {
        if (typeof item.data[param] === "number")
          return BigNumber(item.data[param]).toFixed();
        return item.data[param];
      });

      if (item.type === SMC_FUNC.NO_ACTION) {
        return getEncodeFunction(
          "balanceOf",
          paramsArr,
          SMC_FUNC.MINT,
          item.tokenType
        );
      }

      if (item.type === SMC_FUNC.CUSTOM) {
        return getEncodeFunctionCustomAbi(
          item.functionName,
          item?.abiContent?.abi,
          item.address,
          paramsArr
        );
      }

      console.log(paramsArr);

      return getEncodeFunction(item.type, paramsArr, item.type, item.tokenType);
    });

    try {
      setLoading(true);
      const provider = hashConnect?.getProvider(
        "testnet",
        hashConnect.hcData.topic ?? "",
        data?.accountId ?? ""
      );
      const signer = hashConnect?.getSigner(provider as any);

      const governorData = await getAccountByAddressOrAccountId(
        DAO?.governorAddress
      );

      //convert to encode data unit8 array
      const encodeDataUnit8Array = (encodeDataArr as string[]).map((item) => {
        return ethers.utils.arrayify(item);
      });

      const valuesUnit256Array = dataAmountDecimalConvert.map((item) => {
        return Number(item.values);
      });

      const addressArray = dataAmountDecimalConvert.map((item) => {
        return item.address;
      });
      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(governorData.account)
        .setGas(2000000)
        .setFunction(
          "propose",
          new ContractFunctionParameters()
            .addAddressArray(addressArray) // treasury address
            .addUint256Array(valuesUnit256Array) // amount token
            .addBytesArray(encodeDataUnit8Array) // encode function
            .addString(proposal.title) //description
        )
        .freezeWithSigner(signer as any);
      const contractExecSign = await contractExecTx.signWithSigner(
        signer as any
      );
      const contractExecSubmit = await contractExecSign
        .executeWithSigner(signer as any)
        .catch((e) => console.log(e, "loi"));
      if (contractExecSubmit?.transactionId) {
        const recept = await provider?.getTransactionReceipt(
          contractExecSubmit.transactionId.toString()
        );
        if (recept?.status?._code === 22) {
          const proposalData = await getHashPropposal(
            addressArray,
            encodeDataUnit8Array,
            valuesUnit256Array,
            ethers.utils.arrayify(
              ethers.utils.keccak256(
                // ethers.utils.toUtf8Bytes(proposal!.proposalTitle)
                ethers.utils.toUtf8Bytes(proposal.title)
              )
            ),
            DAO?.governorAddress!
          );
          handleCreateProposal(
            ethers.utils.keccak256(proposalData as Uint8Array),
            JSON.stringify(encodeDataArr),
            valuesUnit256Array,
            addressArray,
            JSON.stringify(handleActionData)
          );
        }
      }
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const previewFile = useMemo(() => {
    if (!proposal?.image) return undefined;
    return typeof proposal?.image === "string"
      ? proposal?.image
      : URL.createObjectURL(proposal?.image);
  }, [proposal?.image]);

  const avatarUrl = useMemo(() => {
    if (proposal?.image) {
      const imageUrl = URL.createObjectURL(proposal?.image);
      return imageUrl;
    }
    return undefined;
  }, [proposal?.image]);

  if (!DAO) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack
          gap="20px"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          border="1px solid #EAECF0"
          borderRadius="5px"
          p="40px"
          mt="40px"
          bgcolor="#fff"
        >
          <Box>
            <Stack direction="column" spacing={1} alignItems="left">
              {/* <Avatar
          username={name}
          avatarUrl={avatarUrl}
          sx={{ width: 56, height: 56 }}
        /> */}

              <Stack>
                <Stack flexDirection={"row"} gap={2}>
                  <Typography variant="h3" sx={{ wordBreak: "break-word" }}>
                    {proposal?.title}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Divider /> */}
              <Stack flexDirection={"row"}>
                {" "}
                <Typography
                  fontSize={16}
                  fontWeight={300}
                  mt={0}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <strong>Proposal by:</strong>{" "}
                  <Avatar
                    username={data?.wallet ?? ""}
                    avatarUrl={data?.avatarUrl}
                    sx={{ width: 20, height: 20 }}
                  />
                  <Address address={data?.wallet} />
                </Typography>{" "}
              </Stack>
            </Stack>

            <Divider style={{ marginTop: "10px" }} />

            <Accordion style={{ marginTop: 1 }} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                style={{ padding: 0 }}
              >
                <Typography variant="h6">Proposal Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Description
                  description={proposal?.description}
                  imageUrl={previewFile}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion style={{ marginTop: "20px" }} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                style={{ padding: 0 }}
              >
                <Typography variant="h6">Actions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {proposal?.actionsData.map((item, index) => {
                  return (
                    <Stack key={item.address}>
                      <Typography fontWeight={500} color={"#8364e2"}>
                        Action #{index + 1}
                      </Typography>
                      <ActionItem action={item} />
                    </Stack>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default forwardRef(FinalStep);
