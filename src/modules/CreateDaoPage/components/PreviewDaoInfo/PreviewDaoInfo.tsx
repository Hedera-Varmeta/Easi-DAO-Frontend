import { IGovernorField } from "@/api/governor";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { DAOForm } from "../..";
import DescribeInfo from "./DescribeInfo";
import GovernorInfo from "./GovernorInfo";
import VoteTokenInfo from "./VoteTokenInfo";
import Membership from "./Membership";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  listVotes: IGovernorField[];
  listGovernors: IGovernorField[];
  governorSettingName?: "ERC20VotesStandard" | "ERC721VotesStandard";
};

const PreviewDaoInfo = ({
  listVotes,
  governorSettingName,
  listGovernors,
}: Props) => {
  const { watch } = useFormContext<DAOForm>();
  const { name, description, logo, governorSetting } = watch();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack gap="40px">
          <Stack direction="row" gap="20px" justifyContent="center">
            <ViewStreamIcon
              sx={{ fontSize: "60px", color: "var(--primary-color)" }}
            />
            <Stack direction="column">
              <Typography variant="h2">Preview DAO information</Typography>
              <Typography fontSize={16} color="#6d6969" fontWeight={500}>
                You have completed all steps. Now please review your DAO
                information before create
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
              <DescribeInfo
                name={name}
                description={description}
                logo={logo}
                governorSetting={governorSetting}
              />

              <Membership governorSettingName={governorSettingName} />

              <Grid container spacing="20px">
                <Grid item sm={7} xs={12}>
                  <GovernorInfo listGovernors={listGovernors} />
                </Grid>
                <Grid item sm={5} xs={12}>
                  <VoteTokenInfo listVotes={listVotes} />
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(PreviewDaoInfo);
