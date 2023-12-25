import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import ERC20MintForm from "./ERC20MintForm";
import ERC721MintForm from "./ERC721MintForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  voteToken: string;
  templateType: string
}

const MintModal: FC<Props> = ({ open, setOpen, voteToken, templateType }) => {
  const onClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: { borderRadius: 10, padding: 5, width: "600px" },
      }}
    >
      <DialogTitle textAlign="center" id="alert-dialog-title">
        <Typography variant="h5" color="primary.main">
          {`Mint ${templateType ?? ''}`}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {templateType === 'ERC20VotesStandard' && (
            <ERC20MintForm onClose={onClose} voteToken={voteToken} />
          )}
          {templateType === 'ERC721VotesStandard' && (
            <ERC721MintForm onClose={onClose} voteToken={voteToken} />
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default MintModal
