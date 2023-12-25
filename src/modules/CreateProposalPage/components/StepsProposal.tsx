import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import { Box, Chip, Stack, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const steps = [
  "Connect Wallet",
  "Create proposal",
  "Add actions",
  "Preview your proposal",
];

type Props = {
  activeStep: number;
}

const StepsProposal = ({ activeStep }: Props) => {
  return (
    <Stack direction="row" justifyContent="center">
      <Stepper
        activeStep={activeStep}
        connector={<NavigateNextOutlined fontSize="small" color="disabled" />}
        sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'secondary.main',
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: 'secondary.main',
          },
          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: 'common.white',
          },
        }}
      >
        {steps.map((label, index) => {
          const color = index <= activeStep ? "secondary.main" : 'default';
          return (
            <Step key={label} >
              <Chip
                variant="outlined"
                label={label}
                icon={<StepLabel />}
                sx={{ borderColor: "secondary.main", color: color, py: 2.1 }} />
            </Step>
          )
        })}
      </Stepper>
    </Stack>
  );
};

export default StepsProposal;