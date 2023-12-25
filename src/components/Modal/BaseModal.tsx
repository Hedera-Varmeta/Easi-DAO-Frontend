import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Show } from "../Show";

type Props = {
  onClose: () => void;
} & DialogProps;

const BaseModal = ({
  fullWidth = true,
  maxWidth = "xs",
  open,
  onClose,
  children,
  title,
}: Props) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "14px",
        },
      }}
    >
      <Box p="20px 30px" mt={title ? 0 : "10px"} position="relative">
        <Show when={!!title}>
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
        </Show>
        <IconButton
          onClick={() => {
            onClose();
          }}
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.5,
            transition: "all 0.5s",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Show when={!!title}>
        <Divider />
      </Show>

      <DialogContent>
        <Box
          minHeight={100}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
