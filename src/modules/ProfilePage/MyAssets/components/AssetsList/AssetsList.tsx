import { IDAOResponse } from '@/api/dao';
import { Show } from '@/components/Show';
import { BalanceWalletItem } from '@/modules/DaoDetail/TreasuryWallet/styled';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import AssetItem from './AssetItem';
import TransferAssetModal from '../TransferAssetModal/TransferAssetModal';

type Props = {
  daoAsset?: IDAOResponse
  onBack: () => void
}

const AssetsList = ({ onBack }: Props) => {
  const [currentTypeAsset, setCurrentTypeAsset] = useState('tokens')
  const [currentAsset, setCurrentAsset] = useState<number>()
  const [openModalTransfer, setOpenModalTransfer] = useState(false)

  return (
    <Container maxWidth="sm" sx={{ position: 'relative' }}>
      <Box
        position={{
          md: 'absolute'
        }}
        top={0}
        left={{
          xs: 0,
          md: '-90px'
        }}

        mb={{ xs: '10px' }}
      >
        <Button variant="contained" sx={{ minWidth: 'inherit' }} onClick={onBack} size="large">
          <KeyboardArrowLeftIcon fontSize="small" />
          <Typography>
            Back
          </Typography>
        </Button>
      </Box>

      <Box mx="auto" display="block" width="fit-content" mb="40px">
        <Stack direction="row" p="5px" bgcolor="var(--primary-color)" borderRadius="5px">
          <BalanceWalletItem
            active={currentTypeAsset === 'tokens'}
            onClick={() => setCurrentTypeAsset('tokens')}
            sx={{ width: '120px' }}
          >
            Tokens
          </BalanceWalletItem>
          <BalanceWalletItem
            active={currentTypeAsset === 'nft'}
            onClick={() => setCurrentTypeAsset('nft')}
            sx={{ width: '120px' }}
          >
            NFT
          </BalanceWalletItem>
        </Stack>
      </Box>

      <Show when={!currentAsset}>
        <Stack spacing="10px">
          {Array.from({ length: 5 }, (v, i) => i).map((assetItem) => (
            <AssetItem
              key={assetItem}
              onClick={() => setCurrentAsset(assetItem)}
            />
          ))}
        </Stack>
      </Show>

      <Show when={!!currentAsset}>
        <Stack spacing="20px">
          <AssetItem />
          <Stack direction="row" spacing="20px">
            <Button variant="outlined" size="large" fullWidth onClick={() => setCurrentAsset(undefined)}>
              Cancel
            </Button>
            <Button variant="contained" size="large" fullWidth onClick={() => setOpenModalTransfer(true)}>
              Transfer
            </Button>
          </Stack>
        </Stack>
        <TransferAssetModal
          open={openModalTransfer}
          setOpen={setOpenModalTransfer}
        />
      </Show>
    </Container>
  );
};

export default AssetsList;