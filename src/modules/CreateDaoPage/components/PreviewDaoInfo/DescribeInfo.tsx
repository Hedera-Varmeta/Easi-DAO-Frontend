import { Markdown } from "@/components/Mardown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import { DAOForm } from "../..";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@/components/Avatar";
import { useAppSelector } from "hooks/useRedux";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";
import { useGetUserInfo } from "@/api/user";
import Address from "@/components/Address/Address";
import { FiberManualRecordOutlined } from "@mui/icons-material";

type Props = Pick<DAOForm, "name" | "description" | "logo" | "governorSetting">;

const DescribeInfo = ({ name, description, logo, governorSetting }: Props) => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });
  const avatarUrl = useMemo(() => {
    if (logo) {
      const imageUrl = URL.createObjectURL(logo);
      return imageUrl;
    }
    return undefined;
  }, [logo]);
  return (
    <Stack gap="10px">
      <Stack direction="column" spacing={1} alignItems="left">
        {/* <Avatar
          username={name}
          avatarUrl={avatarUrl}
          sx={{ width: 56, height: 56 }}
        /> */}

        <Stack>
          <Stack flexDirection={"row"} gap={2}>
            <Typography variant="h3">{name}</Typography>
            <Chip
              label={governorSetting === 1 ? "ERC20" : "ERC721"}
              color="primary"
            />{" "}
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
            <strong>Create by:</strong>{" "}
            <Avatar
              username={data?.wallet ?? ""}
              avatarUrl={data?.avatarUrl}
              sx={{ width: 20, height: 20 }}
            />
            <Address address={data?.wallet} />
          </Typography>{" "}
        </Stack>
      </Stack>
      <Accordion style={{ marginTop: 1 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          style={{ padding: 0 }}
        >
          <Typography variant="h6">Description</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <Stack
            border="1px solid #EAECF0"
            borderRadius="5px"
            p="20px"
            // overflow="hidden"
            textOverflow="ellipsis"
            // display="-webkit-box"
            // maxHeight="150px"
            sx={{ WebkitLineClamp: 15, WebkitBoxOrient: "vertical" }}
          >
            <Markdown onlyView value={description} />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default memo(DescribeInfo);
