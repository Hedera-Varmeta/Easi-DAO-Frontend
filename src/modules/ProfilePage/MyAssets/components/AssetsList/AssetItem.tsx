import { Card, CardProps, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from "framer-motion";

type Props = {} & CardProps

const AssetItem = ({ onClick }: Props) => {
  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer' }}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Stack direction="row" justifyContent="space-between" p="20px" alignItems="center">
            <Stack spacing="5px">
              <Typography fontWeight="bold">
                Token Name
              </Typography>
              <Typography color="var(--text-des-color)">
                symbol
              </Typography>
            </Stack>
            <Typography fontWeight="bold">123123</Typography>
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default AssetItem;