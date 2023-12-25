import React from 'react';
import { ParticipateStyled } from './styled';
import { Radio } from '@mui/material';

type Props = {
  name: string;
  des?: string;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ParticipateItem = ({ name, des, checked, onClick, disabled = false }: Props) => {
  return (
    <ParticipateStyled checked={checked} onClick={() => !disabled && onClick()}>
      <div>
        <div className="participate-name">
          {name}
        </div>
        <div className="participate-des">
          {des}
        </div>
      </div>
      <div>
        <Radio checked={checked} />
      </div>
    </ParticipateStyled>
  );
};

export default ParticipateItem;