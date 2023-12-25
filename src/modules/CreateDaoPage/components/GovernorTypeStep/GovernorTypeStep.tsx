import { IGovernorSetting, IGovernorType } from "@/api/governor";
import { Container, Stack, Typography } from "@mui/material";
import GovernorTypeField from "./GovernorTypeField";
import GovernorVoteTokenField from "./GovernorVoteTokenField";
import LayersIcon from "@mui/icons-material/Layers";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  listGovernors: IGovernorType[];
  governorSettings: IGovernorSetting[];
};

const GovernorTypeStep = ({ listGovernors, governorSettings }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack gap="40px">
          <Stack direction="row" gap="20px" justifyContent="center">
            <LayersIcon
              sx={{ fontSize: "60px", color: "var(--primary-color)" }}
            />
            <Stack direction="column">
              <Typography variant="h2">Governor Configuration</Typography>
              <Typography fontSize={16} color="#6d6969" fontWeight={500}>
                Select governor type and vote token type for your DAO
              </Typography>
            </Stack>
          </Stack>
          <Container maxWidth="md">
            <Stack
              gap="20px"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              border="1px solid #EAECF0"
              borderRadius="5px"
              p="40px"
              bgcolor="#fff"
            >
              <GovernorTypeField
                name="governorType"
                label="Governor Type"
                listGovernors={listGovernors}
              />

              <GovernorVoteTokenField
                name="governorSetting"
                label="Vote Token Type"
                governorSettings={governorSettings}
              />
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(GovernorTypeStep);
