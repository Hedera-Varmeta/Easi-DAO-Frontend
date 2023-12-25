import LogoUpload from "@/form-fields/LogoUpload";
import MarkdownField from "@/form-fields/MarkdownField";
import TextField from "@/form-fields/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import LaunchIcon from "@mui/icons-material/Launch";
import { Container, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { LinkStyled } from "../styled";
import { motion, AnimatePresence } from "framer-motion";

const DescribeStep = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: 40, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stack gap="40px">
          <Stack direction="row" gap="20px" justifyContent="center">
            <DescriptionIcon
              sx={{ fontSize: "60px", color: "var(--primary-color)" }}
            />
            <Stack direction="column">
              <Typography variant="h2">Describe your DAO</Typography>
              <Typography fontSize={16} color="#6d6969" fontWeight={500}>
                Define name and description for your DAO
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
              {/* <Typography variant="h5" mb={1}>
            Basic details
          </Typography> */}
              <Stack spacing={1}>
                <LogoUpload
                  size={100}
                  name="logo"
                  label="DAO Logo"
                  optional
                  description="We recommend 512x512px"
                />
                <TextField
                  name="name"
                  label="DAO Name"
                  size="medium"
                  placeholder="Enter your DAO name"
                />
                <MarkdownField
                  name="description"
                  label="Description"
                  description={
                    <Stack direction="row" gap="5px" alignItems="center">
                      <Typography>
                        Dao description can be written as plain text or
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
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(DescribeStep);
