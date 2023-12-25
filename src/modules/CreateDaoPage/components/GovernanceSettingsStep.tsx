import { IGovernorField } from "@/api/governor";
import TextField from "@/form-fields/TextField";
import { InfoOutlined } from "@mui/icons-material";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import { Box, Container, Stack, Tooltip, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  listGovernorField: IGovernorField[];
};

const GovernanceSettingsStep = ({ listGovernorField }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack gap="40px">
          <Stack direction="row" gap="20px" justifyContent="center">
            <SettingsInputCompositeIcon
              sx={{ fontSize: "60px", color: "var(--primary-color)" }}
            />
            <Stack direction="column">
              <Typography variant="h2">Governance settings</Typography>
              <Typography fontSize={16} color="#6d6969" fontWeight={500}>
                Configuration settings governance for your DAO
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
              {listGovernorField.map((governorItem) => (
                <TextField
                  name={governorItem.fieldName}
                  type="number"
                  label={
                    <Box display="flex" alignItems="center">
                      {governorItem?.fieldDescription}
                      <Tooltip
                        title={governorItem?.fieldPlaceholder || "Tooltip"}
                      >
                        <InfoOutlined
                          style={{ fontSize: "14px", marginLeft: 2 }}
                        />
                      </Tooltip>
                    </Box>
                  }
                  key={governorItem.id}
                  placeholder={governorItem?.fieldValue}
                />
              ))}
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default GovernanceSettingsStep;
