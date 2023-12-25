import { UploadZone } from "@/components/UploadZone/UploadZone";
import FormWrapper from "@/form-fields/FormWrapper";
import MarkdownField from "@/form-fields/MarkdownField";
import TextField from "@/form-fields/TextField";
import { LinkStyled } from "@/modules/CreateDaoPage/styled";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { getProposal, setProposalInfo } from "@/store/ducks/proposal/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useRouter } from "next/router";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RefValidateProposal } from "..";
import { getFormProposalInfoSchema } from "./FormTypes";
import { motion, AnimatePresence } from "framer-motion";

interface FormProposalInfo {
  proposalTitle: string;
  proposalDescription: string;
  image: File | undefined;
}

type Props = {};

const NameProposalStep = (_props: Props, ref: Ref<RefValidateProposal>) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const router = useRouter();
  const { id } = router.query;
  const proposal = useAppSelector(getProposal);

  const methods = useForm<FormProposalInfo>({
    resolver: yupResolver(getFormProposalInfoSchema),
    mode: "onChange",
    defaultValues: {
      proposalTitle: proposal?.title || "",
      proposalDescription: proposal?.description || "",
      image: proposal?.image || undefined,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormProposalInfo> = (data) => {
    dispatch(
      setProposalInfo({
        title: data?.proposalTitle,
        description: data?.proposalDescription,
        image: image,
      })
    );
  };

  const validate = async () => {
    const output = await methods.trigger();
    if (output) {
      methods.handleSubmit(onSubmit)();
    }
    return output;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    if (proposal?.image) setImage(proposal?.image);
  }, [proposal?.image]);

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
            <Typography mb={2}>
              Give your proposal a title and a descrition. They will be public
              when your proposal goes live!
            </Typography>
            <FormWrapper methods={methods} onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField
                  required
                  name="proposalTitle"
                  label="Title"
                  placeholder="Enter the title of your proposal..."
                />
                <MarkdownField
                  name="proposalDescription"
                  label="Description"
                  description={
                    <Stack direction="row" gap="5px" alignItems="center">
                      <Typography>
                        Proposal description can be written as plain text or
                        formatted with
                      </Typography>
                      <LinkStyled
                        href="https://www.markdownguide.org/basic-syntax"
                        target="_blank"
                      >
                        <Typography fontWeight="bold">Markdown </Typography>
                        <LaunchIcon fontSize="inherit" />
                      </LinkStyled>
                    </Stack>
                  }
                />
                <Typography
                  color="primary"
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                >
                  Preview image (optional)
                </Typography>
                <UploadZone
                  name="image"
                  onSuccess={(file) => setImage(file)}
                  sx={{
                    width: "100%",
                    height: 320,
                  }}
                  initFile={proposal?.image || undefined}
                />
              </Stack>
            </FormWrapper>
          </Box>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default forwardRef(NameProposalStep);
