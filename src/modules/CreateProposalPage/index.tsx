import { Layout } from "@/layout";
import { LoadingButton } from "@mui/lab";
import {
  Breadcrumbs,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { PageComponent } from "next";
import React, { useEffect, useRef, useState } from "react";
import AddActionStep from "./components/AddActionStep";
import ConnectWalletStep from "./components/ConnecWalletStep";
import FinalStep from "./components/FinalStep";
import NameProposalStep from "./components/NameProposalStep";
import StepsProposal from "./components/StepsProposal";
import { useAppDispatch } from "hooks/useRedux";
import { resetProposalData } from "@/store/ducks/proposal/slice";
import { useRouter } from "next/router";
import { useGetDAODetail } from "@/api/dao";

import Link from "next/link";
import { routeEnums } from "@/types/routes";
import { BreadCrumbComponent } from "@/components/BreadCrumbs";
import OverlayPage from "@/components/OverlayPage/OverlayPage";

export type RefValidateProposal = {
  validate?: () => Promise<boolean> | boolean;
  onSubmit?: () => Promise<void>;
};

export const CreateProposalPage: PageComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const refProposal = useRef<RefValidateProposal>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data: DAO } = useGetDAODetail(Number(id));

  const nextStep = () => {
    if (activeStep === 3) return;
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    if (activeStep === 0) return;
    setActiveStep(activeStep - 1);
  };

  const triggerNextStep = async () => {
    let output = false;
    if (activeStep < 3) {
      output =
        (refProposal.current?.validate &&
          (await refProposal.current?.validate())) ??
        false;
    } else {
      output = true;
    }

    if (output) {
      if (activeStep < 3) {
        nextStep();
      } else {
        refProposal.current?.onSubmit &&
          (await refProposal.current?.onSubmit());
      }
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeStep === 0) dispatch(resetProposalData());
  }, [activeStep, dispatch]);

  const breadcrumbs = [
    // <Link key="2" color="inherit" href={routeEnums.manageDAO}>
    //   <Typography fontWeight={400} fontSize={16}>
    //     DAOs
    //   </Typography>
    // </Link>,
    <Link
      key="2"
      color="inherit"
      href={`${routeEnums.detailDAO}?id=${id}&governorId=${DAO?.governorId}`}
    >
      <Typography fontWeight={400} fontSize={16}>
        {DAO?.daoName}
      </Typography>
    </Link>,
    <Typography key="3" fontWeight={600} fontSize={16}>
      Create Proposal
    </Typography>,
  ];

  return (
    <OverlayPage loading={loading}>
      <BreadCrumbComponent breadcrumbs={breadcrumbs} />
      <Container sx={{ p: "20px" }}>
        <StepsProposal activeStep={activeStep} />
        <Container maxWidth="md">
          {/* <Stack
            gap="20px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            border="1px solid #EAECF0"
            borderRadius="5px"
            p="40px"
            mt="40px"
            bgcolor="#fff"
          > */}
          {activeStep === 0 && <ConnectWalletStep ref={refProposal} />}
          {activeStep === 1 && <NameProposalStep ref={refProposal} />}
          {activeStep === 2 && <AddActionStep ref={refProposal} DAO={DAO} />}
          {activeStep === 3 && (
            <FinalStep ref={refProposal} setLoading={setLoading} DAO={DAO} />
          )}
          {/* </Stack> */}
          <Stack
            direction="row"
            justifyContent="center"
            marginTop="40px"
            gap="20px"
          >
            {activeStep !== 0 && (
              <Button
                sx={{ minWidth: "100px" }}
                variant="outlined"
                type="button"
                onClick={previousStep}
                size="large"
              >
                Previous
              </Button>
            )}
            <LoadingButton
              sx={{ minWidth: "100px" }}
              variant="contained"
              loading={loading}
              onClick={triggerNextStep}
              size="large"
            >
              {activeStep === 3 ? "Create Proposal" : "Next"}
            </LoadingButton>
          </Stack>
        </Container>
      </Container>
    </OverlayPage>
  );
};

CreateProposalPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
