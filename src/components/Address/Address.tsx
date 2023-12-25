import { shortenIfAddress } from '@/utils/common';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Stack, Tooltip, Typography, TypographyProps } from '@mui/material';
import { useCopy } from 'hooks/useCopy';

const Address = ({
  address,
  length = 10,
  showCopy = true,
  ...props
}: { address?: string, length?: number, showCopy?: boolean } & TypographyProps) => {
  const [copied, copy] = useCopy();

  const onCopy = () => {
    copy(address);
  }

  if (!address) return null;
  return (
    <Stack direction="row" gap="10px" alignItems="center">
      <Tooltip title={address} arrow placement="top">
        <Typography {...props}>
          {shortenIfAddress(address, length)}
        </Typography>
      </Tooltip>
      {showCopy && (
        <IconButton disabled={copied} size="small" onClick={onCopy}>
          {copied
            ? <CheckIcon
              sx={{
                color: 'success.main',
                fontSize: '18px'
              }}
            />
            : <ContentCopyIcon
              sx={{
                color: "var(--text-des-color)",
                fontSize: '18px'
              }}
            />
          }
        </IconButton>
      )}
    </Stack>
  );
};

export default Address;