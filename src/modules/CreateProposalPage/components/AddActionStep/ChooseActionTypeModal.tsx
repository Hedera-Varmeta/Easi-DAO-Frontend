import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { StyledButton } from "./styled";
import SyncIcon from "@mui/icons-material/Sync";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FC, useEffect, useMemo, useState } from "react";
import { DAO_VOTE_TYPE, SMC_FUNC, TOKEN_TYPE } from "@/utils/constants";
import BaseModal from "@/components/Modal/BaseModal";

interface Props {
  handleAdd: any;
  daoSettingType: string;
}

const treasuryActions = [
  {
    value: SMC_FUNC.RELEASE_ERC20,
    label: "Release ERC20",
    tokenType: TOKEN_TYPE.ERC20
  },
  {
    value: SMC_FUNC.RELEASE_ERC721,
    label: "Release ERC721",
    tokenType: TOKEN_TYPE.ERC721
  },
  {
    value: "releaseERC1155",
    label: "Release ERC1155",
    tokenType: TOKEN_TYPE.ERC1155
  },
  {
    value: "releaseNativeToken",
    label: "Release Native Token",
    tokenType: TOKEN_TYPE.NATIVE
  },
];

export const ChooseActionTypeModal: FC<Props> = ({
  handleAdd,
  daoSettingType,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [type, setType] = useState<string>("");
  const handleAddAction = (type: string, tokenType: string) => {
    handleAdd(type, tokenType);
    handleClose();
  };

  const tokenTypeMint = useMemo(() => {
    let tokenTypeMint;
    switch (daoSettingType) {
      case DAO_VOTE_TYPE.ERC20_STANDARDS: {
        tokenTypeMint = TOKEN_TYPE.ERC20;
        break;
      }
      case DAO_VOTE_TYPE.ERC721_STANDARDS: {
        tokenTypeMint = TOKEN_TYPE.ERC721;
        break;
      }
      default: {
        tokenTypeMint = TOKEN_TYPE.ERC20;
        break;
      }
    }
    return tokenTypeMint;
  }, [daoSettingType]);

  useEffect(() => {
    setType("");
  }, [open]);

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleOpen}>Add Action</Button>
      <BaseModal
        open={open}
        onClose={() => setOpen(false)}
        title="Voting on Chain"
      >
        <Stack gap={2} alignItems={"center"} width="100%">
          {type === "" && (
            <>
              <StyledButton
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => handleAddAction(SMC_FUNC.MINT, tokenTypeMint)}
              >
                <SyncIcon sx={{ marginRight: 1 }} />
                Mint Token
              </StyledButton>
              <StyledButton
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => setType("treasury")}
              >
                <NoteAddIcon sx={{ marginRight: 1 }} />
                Treasury Actions
              </StyledButton>
              <StyledButton
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => handleAddAction("custom", tokenTypeMint)}
              >
                <NoteAddIcon sx={{ marginRight: 1 }} />
                Custom Actions
              </StyledButton>
            </>
          )}
          {type === "treasury" && (
            <>
              {treasuryActions.map((item) => {
                return (
                  <StyledButton
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={() => handleAddAction(item.value, item.tokenType)}
                    key={item.value}
                  >
                    <NoteAddIcon sx={{ marginRight: 1 }} />
                    {item.label}
                  </StyledButton>
                );
              })}
            </>
          )}
        </Stack>
      </BaseModal>
    </div>
  );
};
