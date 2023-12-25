import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Ref, forwardRef, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { IDAODetailResponse } from "@/api/dao";
import ErrorHelper from "@/components/ErrorHelper";
import FormWrapper from "@/form-fields/FormWrapper";
import { getProposal, setActionsData } from "@/store/ducks/proposal/slice";
import { IAction } from "@/types/util.types";
import { SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RefValidateProposal } from "../..";
import { getFormActionsSchema } from "../FormTypes";
import { ChooseActionTypeModal } from "./ChooseActionTypeModal";
import { CustomForm } from "./Forms/CustomForm";
import { MintErc20Form } from "./Forms/MintForm/MintErc20Form";
import { MintErc721Form } from "./Forms/MintForm/MintErc721Form";
import { ReleaseERC20Form } from "./Forms/TreasuryForm/ReleaseErc20Form";
import { ReleaseERC721Form } from "./Forms/TreasuryForm/ReleaseErc721Form";
import { ReleaseNativeTokenForm } from "./Forms/TreasuryForm/ReleaseNativeTokenForm";
import { FlexBox } from "./styled";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  DAO?: IDAODetailResponse;
};

export interface IForm {
  arr: IAction[];
}

const AddActionStep = ({ DAO }: Props, ref: Ref<RefValidateProposal>) => {
  const dispatch = useAppDispatch();
  const proposal = useAppSelector(getProposal);

  const methods = useForm<IForm>({
    resolver: yupResolver(getFormActionsSchema),
    mode: "onChange",
    defaultValues: {
      arr: proposal?.actionsData ?? [],
    },
  });

  const {
    control,
    trigger,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "arr",
  });

  const onSubmit = (data: IForm) => {
    dispatch(setActionsData({ actionsData: data.arr }));
  };

  const handleAdd = (type: SMC_FUNC, tokenType: TOKEN_TYPE) => {
    if (!DAO) return;
    let address = "";
    let data: any = {};
    switch (type) {
      case SMC_FUNC.RELEASE_ERC20: {
        address = String(DAO?.predictTreasury);
        // data.tokenAddress = DAO?.voteToken;
        break;
      }
      case SMC_FUNC.RELEASE_ERC721: {
        address = String(DAO?.predictTreasury);
        // data.tokenAddress = DAO?.voteToken;
        data.from = DAO?.predictTreasury;
        break;
      }
      case SMC_FUNC.MINT: {
        address = String(DAO?.voteToken);
        break;
      }
      case SMC_FUNC.CUSTOM: {
        address = "";
        break;
      }
      default: {
        address = String(DAO?.predictTreasury);
        break;
      }
    }
    append({
      address: address,
      type: type,
      values: 0,
      tokenType: tokenType,
      data: data,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const validate = async () => {
    const output = await trigger();
    if (output) {
      methods.handleSubmit(onSubmit)();
    }
    return output;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

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
          <FormWrapper methods={methods} onSubmit={onSubmit}>
            <Box>
              <Stack spacing={1} mb={2}>
                <Typography>
                  Actions are on-chain calls that will execute after a proposal
                  passes and then gets executed.
                </Typography>
                <Typography>You can add up to ten actions.</Typography>
                <Typography>
                  If you skip this step, a view action to your balance (the
                  proposer&apos;s balance) will be added, as Governor requires
                  one executable action for the proposal to be submitted
                  on-chain.
                </Typography>
              </Stack>

              <Stack gap="10px">
                {fields.map((item, index) => {
                  return (
                    <Container
                      key={item.id}
                      sx={{
                        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        borderRadius: "5px",
                        border: "1px solid #EAECF0",
                        py: "20px",
                      }}
                    >
                      <Stack key={index} spacing={2}>
                        <Typography fontWeight={500} color={"#8364e2"}>
                          Action #{index + 1}
                        </Typography>
                        <Typography fontWeight={400}>{item.type}</Typography>
                        {item.type === SMC_FUNC.RELEASE_ERC20 && (
                          <ReleaseERC20Form index={index} />
                        )}
                        {item.type === SMC_FUNC.RELEASE_ERC721 && (
                          <ReleaseERC721Form index={index} />
                        )}
                        {item.type === SMC_FUNC.MINT &&
                          item.tokenType === TOKEN_TYPE.ERC20 && (
                            <MintErc20Form index={index} />
                          )}
                        {item.type === SMC_FUNC.MINT &&
                          item.tokenType === TOKEN_TYPE.ERC721 && (
                            <MintErc721Form index={index} />
                          )}
                        {item.type === SMC_FUNC.RELEASE_NATIVE_TOKEN && (
                          <ReleaseNativeTokenForm index={index} />
                        )}
                        {item.type === SMC_FUNC.CUSTOM && (
                          <CustomForm index={index} />
                        )}
                        <Divider />
                        <FlexBox flexDirection={"row"}>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleRemove(index)}
                          >
                            Remove action
                          </Button>
                        </FlexBox>
                      </Stack>
                    </Container>
                  );
                })}
              </Stack>

              <FlexBox flexDirection={"row"} mt={2}>
                <ChooseActionTypeModal
                  handleAdd={handleAdd}
                  daoSettingType={DAO?.governorSettingName || ""}
                />
              </FlexBox>
              <FlexBox flexDirection={"row"} mt={2}>
                {errors?.arr?.message && (
                  <ErrorHelper message={errors?.arr?.message as string} />
                )}
              </FlexBox>
            </Box>
          </FormWrapper>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default forwardRef(AddActionStep);
