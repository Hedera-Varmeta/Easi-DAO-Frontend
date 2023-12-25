import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import LayersIcon from "@mui/icons-material/Layers";
import { IntroductionStepItem } from "../styled";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: 0,
    stepTitle: "Select Governor Configuration",
    icon: LayersIcon,
  },
  {
    id: 1,
    stepTitle: "Describe your DAO",
    icon: DescriptionIcon,
  },
  {
    id: 2,
    stepTitle: "Define membership",
    icon: GroupIcon,
  },
  {
    id: 3,
    stepTitle: "Governance settings",
    icon: SettingsInputCompositeIcon,
  },
];

const IntroductionStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <Stack gap="40px">
      <Container
        sx={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "40px 0",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7} md={6}>
            <Typography variant="h2">Build your DAO</Typography>
            <Typography fontSize={16} color="#6d6969" fontWeight={500}>
              Start simple and learn as you go. You can always evolve your DAO
              in the future
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={6} display="flex" justifyContent="end">
            <Button size="large" onClick={onNext} variant="contained">
              Build your DAO
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={4} justifyContent="center">
        {steps.map((stepItem, index) => (
          <Grid item xs={6} sm={3} key={stepItem.id}>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index / 10 }}
                style={{ height: "100%" }}
              >
                <IntroductionStepItem>
                  <div className="icon">
                    {
                      <stepItem.icon
                        className="icon-item"
                        sx={{ fontSize: "60px", color: "var(--primary-color)" }}
                      />
                    }
                  </div>
                  <div className="step">{`Step ${index + 1}`}</div>
                  <Typography variant="h6">{stepItem.stepTitle}</Typography>
                </IntroductionStepItem>
              </motion.div>
            </AnimatePresence>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default memo(IntroductionStep);
