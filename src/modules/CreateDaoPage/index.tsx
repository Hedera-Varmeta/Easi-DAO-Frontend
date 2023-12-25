import {
  IGovernorResponse,
  IGovernorsValueRequest,
  addListValue,
  addListVoteValue,
  createDAO,
  createGovernor,
  useGetListGovernorFields,
  useGetListGovernorSettings,
  useGetListGovernorType,
  useGetListVoteFields,
} from "@/api/governor";
import { useGetUserInfo } from "@/api/user";
import {
  ERC20VotesStandard__factory,
  ERC721VotesStandard__factory,
  StandardGovernor__factory,
} from "@/contracts/types";
import FormWrapper from "@/form-fields/FormWrapper";
import { Layout } from "@/layout";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { routeEnums } from "@/types/routes";
import { convertToEvmAddress } from "@/utils/common";
import { GOVERNOR_CONTRACT_ID, genSalt } from "@/utils/constants";
import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Container, Stack } from "@mui/material";
import BigNumber from "bignumber.js";
import { HederaWalletsContext } from "context/HederaContext";
import { ethers } from "ethers";
import { useGetPredictTreasuryAddress } from "hooks/useGetPredictTreasuryAddress";
import { usePredictGovernorDeterministicAddress } from "hooks/usePredictGovernorDeterministicAddress";
import { usePredictTimelockDeterministicAddress } from "hooks/usePredictTimelockDeterministicAddress";
import { usePredictVoteTokenDeterministicAddress } from "hooks/usePredictVoteTokenDeterministicAddress";
import { useAppSelector } from "hooks/useRedux";
import { PageComponent } from "next";
import { useRouter } from "next/router";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DescribeStep from "./components/DescribeStep";
import { getFormCreateDAOSchema } from "./components/FormType";
import GovernanceSettingsStep from "./components/GovernanceSettingsStep";
import GovernorTypeStep from "./components/GovernorTypeStep/GovernorTypeStep";
import IntroductionStep from "./components/IntroductionStep";
import MemberShipStep from "./components/MembershipStep";
import PreviewDaoInfo from "./components/PreviewDaoInfo/PreviewDaoInfo";
import OverlayPage from "@/components/OverlayPage";

export type DAOForm = {
  governorType: number;
  governorSetting: number;
  name: string;
  logo?: File;
  description: string;
  quorumNumerator: number;
  initialVotingDelay: number;
  initialVotingPeriod: number;
  initialProposalThreshold: number;
  tokenName: string;
  symbol: string;
  timelockMinDelay: number;
  participateType: "tokenHolders" | "multisigMembers";
  // isMintToken: boolean;
  distributeTokens: {
    address: string;
    amount?: number;
    tokenUri?: string;
  }[];
};

export const CreateDaoPage: PageComponent = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [governorSettingName, setGovernorSettingName] = useState<
    "ERC20VotesStandard" | "ERC721VotesStandard"
  >();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });
  const { hashConnect } = useContext(HederaWalletsContext);
  const provider = hashConnect?.getProvider(
    "testnet",
    hashConnect.hcData.topic ?? "",
    data?.accountId ?? ""
  );
  const [salt, makeSalt] = useState(
    ethers.utils.arrayify(ethers.utils.formatBytes32String(genSalt()))
  );

  const timelock = usePredictTimelockDeterministicAddress(100000, salt); // address
  const predictGovernor = usePredictGovernorDeterministicAddress(
    100000,
    "StandardGovernor",
    salt
  );
  const { getPredictTreasuryAddress } = useGetPredictTreasuryAddress(
    100000,
    salt
  );

  const onReGenSalt = () => {
    makeSalt(
      ethers.utils.arrayify(ethers.utils.formatBytes32String(genSalt()))
    );
  };

  const onNextStep = () => {
    if (step === 5) return;
    setStep(step + 1);
  };

  const onPreviousStep = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const methods = useForm<
    any,
    { governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard" }
  >({
    resolver: yupResolver(getFormCreateDAOSchema()),
    mode: "onChange",
    context: {
      governorSettingName,
    },
  });

  const { governorType, governorSetting } = methods.watch();

  const { data: listGovernorType } = useGetListGovernorType({
    page: 1,
    limit: 100,
  });

  const { data: listGovernorSettings } = useGetListGovernorSettings(
    {
      typeId: governorType,
    },
    { enabled: !!governorType && governorType !== 0 }
  );

  const { data: listVoteField } = useGetListVoteFields(
    {
      settingId: governorSetting,
    },
    { enabled: !!governorSetting && governorSetting !== 0 }
  );

  const { data: listGovernorField } = useGetListGovernorFields(
    {
      settingId: governorSetting,
    },
    { enabled: !!governorSetting && governorSetting !== 0 }
  );

  const getVoteTokenSettingName = useCallback(
    (governorSettingId: number) =>
      listGovernorSettings?.list.find(
        (setting) => setting.id === governorSettingId
      )?.settingName,
    [listGovernorSettings?.list]
  );

  useEffect(() => {
    const voteTokenSettingName =
      getVoteTokenSettingName(governorSetting) ?? undefined;
    setGovernorSettingName(voteTokenSettingName);
  }, [getVoteTokenSettingName, governorSetting]);

  const voteTokenPreset = useMemo(() => {
    return listGovernorSettings?.list.find(
      (item) => item.id === governorSetting
    )?.settingName;
  }, [governorSetting, listGovernorSettings?.list]);

  const vote = usePredictVoteTokenDeterministicAddress(
    100000,
    voteTokenPreset ?? "",
    salt
  ); // status : true

  const getERC20Values = (formData: DAOForm) => {
    const standardGovernor = new StandardGovernor__factory();
    const erc20VotesStandardFactory = new ERC20VotesStandard__factory();

    const governorInitializeData =
      standardGovernor.interface.encodeFunctionData("initialize", [
        vote.address,
        timelock.address,
        Number(formData.quorumNumerator),
        Number(formData.initialVotingDelay),
        Number(formData.initialVotingPeriod),
        // Number(formData.initialProposalThreshold),
        ethers.utils
          .parseUnits(String(formData.initialProposalThreshold), 18)
          .toString(),
        formData.name,
      ]);

    const voteTokenInitializeData =
      erc20VotesStandardFactory.interface.encodeFunctionData("initialize", [
        formData.tokenName,
        formData.symbol,
        // data?.wallet ?? "",
      ]);

    const initialMint = erc20VotesStandardFactory.interface.encodeFunctionData(
      "initialMint",
      [
        formData.distributeTokens.map((wallet) =>
          convertToEvmAddress(wallet.address)
        ),
        formData.distributeTokens.map((wallet) =>
          // new BigNumber(String(wallet.amount))
          //   .multipliedBy(new BigNumber(10).pow(Number(18)))
          //   .toString()
          ethers.utils
            .parseEther(BigNumber(wallet.amount as number).toFixed())
            .toString()
        ),
        timelock.address,
      ]
    );

    return {
      governorInitializeData,
      voteTokenInitializeData,
      initialMint,
    };
  };

  const getERC721Values = (formData: DAOForm) => {
    const standardGovernor = new StandardGovernor__factory();
    const erc721VotesStandardFactory = new ERC721VotesStandard__factory();

    const governorInitializeData =
      standardGovernor.interface.encodeFunctionData("initialize", [
        vote.address,
        timelock.address,
        Number(formData.quorumNumerator),
        Number(formData.initialVotingDelay),
        Number(formData.initialVotingPeriod),
        Number(formData.initialProposalThreshold),
        // BigNumber(formData.initialProposalThreshold)
        //   .multipliedBy(new BigNumber(10).pow(Number(18)))
        //   .toFixed(),
        formData.name,
      ]);

    const voteTokenInitializeData =
      erc721VotesStandardFactory.interface.encodeFunctionData("initialize", [
        formData.tokenName,
        formData.symbol,
        "",
        // data?.wallet ?? "",
      ]);

    const initialMint = erc721VotesStandardFactory.interface.encodeFunctionData(
      "initialMint",
      [
        formData.distributeTokens.map((wallet) =>
          convertToEvmAddress(wallet.address)
        ),
        formData.distributeTokens.map((wallet) => wallet.tokenUri ?? ""),
        timelock.address,
      ]
    );

    return {
      governorInitializeData,
      voteTokenInitializeData,
      initialMint,
    };
  };

  const handleSubmit: SubmitHandler<DAOForm> = async (formData) => {
    try {
      setLoading(true);
      const predictTreasure = await getPredictTreasuryAddress();
      const signer = hashConnect?.getSigner(provider as any);
      const voteTokenSettingName =
        getVoteTokenSettingName(formData.governorSetting) ?? "";

      const { governorInitializeData, voteTokenInitializeData, initialMint } =
        voteTokenSettingName === "ERC20VotesStandard"
          ? getERC20Values(formData)
          : getERC721Values(formData);

      const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(GOVERNOR_CONTRACT_ID)
        .setGas(10000000)
        .setFunction(
          "createGovernor",
          new ContractFunctionParameters()
            .addString("StandardGovernor")
            .addBytes(ethers.utils.arrayify(governorInitializeData))
            .addString(voteTokenSettingName)
            .addBytes(ethers.utils.arrayify(voteTokenInitializeData))
            .addBytes(ethers.utils.arrayify(initialMint))
            .addUint256(Number(formData.timelockMinDelay))
            .addAddressArray([predictGovernor.address])
            .addAddressArray([predictGovernor.address])
            .addAddress(predictGovernor.address)
            .addBytes32(salt)
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
          const callCreateGovernor: IGovernorResponse = await createGovernor({
            name: formData.name,
            address: predictGovernor.address,
            typeId: governorType,
            settingId: governorSetting,
            role: "superadmin",
            voteToken: vote.address,
            timelockDeterministic: timelock.address,
            timelockMinDelay: Number(formData.timelockMinDelay),
            predictTreasury: predictTreasure,
          });

          await createDAO({
            daoName: formData.name,
            daoDescription: formData.description,
            governorId: callCreateGovernor.id,
            logo: formData.logo,
          });

          const dataListValue: IGovernorsValueRequest[] = (
            listGovernorField?.list ?? []
          ).map((item) => ({
            governorId: callCreateGovernor.id,
            fieldId: item.id,
            fieldValue: (formData as any)?.[item.fieldName as any],
          }));
          await addListValue(dataListValue);

          const dataListVoteValue: IGovernorsValueRequest[] = (
            listVoteField?.list ?? []
          ).map((item) => ({
            governorId: callCreateGovernor.id,
            fieldId: item.id,
            fieldValue: (formData as any)?.[item.fieldName as any],
          }));
          await addListVoteValue(dataListVoteValue);

          setLoading(false);
          toast.success("Successfully");
          await router.push(routeEnums.manageDAO);
        } else {
          setLoading(false);
          toast.error("Cannot create DAO");
        }
      } else {
        onReGenSalt();
      }
    } catch (error) {
      console.log(error);
      onReGenSalt();
    } finally {
      setLoading(false);
    }
  };

  const triggerNextStep = async () => {
    let output = false;
    switch (step) {
      case 0:
        output = true;
        break;
      case 1:
        output = await methods.trigger(["governorType", "governorSetting"]);
        break;
      case 2:
        output = await methods.trigger(["name", "description"]);
        break;
      case 3:
        output = await methods.trigger(
          (listVoteField?.list ?? [])
            .map((tokenField) => tokenField.fieldName)
            .concat("participateType")
            .concat("distributeTokens") as any
        );
        break;
      case 4:
        output = await methods.trigger(
          (listGovernorField?.list ?? []).map(
            (governorItem) => governorItem.fieldName
          ) as any
        );
        break;
      case 5:
        output = true;
        break;
      default:
        break;
    }

    if (output) {
      if (step < 5) {
        onNextStep();
      } else {
        methods.handleSubmit(handleSubmit)();
      }
    }
  };

  useEffect(() => {
    if (
      listGovernorType?.list &&
      Array.isArray(listGovernorType?.list) &&
      listGovernorType?.list.length > 0
    ) {
      methods.setValue("governorType", listGovernorType.list[0].id);
    }
  }, [listGovernorType?.list, methods]);

  return (
    <OverlayPage loading={loading}>
      <Container sx={{ p: "20px" }}>
        <FormWrapper
          formRef={formRef}
          methods={methods}
          onSubmit={handleSubmit}
        >
          <Container
            maxWidth="lg"
            sx={{
              padding: "30px",
            }}
          >
            {step === 0 && <IntroductionStep onNext={onNextStep} />}
            {step === 1 && (
              <GovernorTypeStep
                listGovernors={listGovernorType?.list ?? []}
                governorSettings={listGovernorSettings?.list ?? []}
              />
            )}
            {step === 2 && <DescribeStep />}
            {step === 3 && (
              <MemberShipStep
                listVotes={listVoteField?.list ?? []}
                governorSettingName={governorSettingName}
              />
            )}
            {step === 4 && (
              <GovernanceSettingsStep
                listGovernorField={listGovernorField?.list ?? []}
              />
            )}
            {step === 5 && (
              <PreviewDaoInfo
                listVotes={listVoteField?.list ?? []}
                listGovernors={listGovernorField?.list ?? []}
                governorSettingName={governorSettingName}
              />
            )}

            {step !== 0 && (
              <Container maxWidth="md">
                <Stack
                  direction="row"
                  justifyContent="center"
                  marginTop="40px"
                  gap="20px"
                >
                  <Button
                    sx={{ minWidth: "100px" }}
                    variant="outlined"
                    type="button"
                    onClick={onPreviousStep}
                    size="large"
                  >
                    Previous
                  </Button>
                  <LoadingButton
                    sx={{ minWidth: "100px" }}
                    variant="contained"
                    loading={loading}
                    onClick={triggerNextStep}
                    size="large"
                  >
                    {step === 5 ? "Create DAO" : "Next"}
                  </LoadingButton>
                </Stack>
              </Container>
            )}
          </Container>
        </FormWrapper>
      </Container>
    </OverlayPage>
  );
};

CreateDaoPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
