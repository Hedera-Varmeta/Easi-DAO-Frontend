import { Typography, TypographyProps } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'

type Props = TypographyProps & {
  lastTime: number;
}

const TimeLive = ({ lastTime, ...props }: Props) => {

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = currentTime - lastTime;

      if (timeLeft < 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        setTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastTime]);

  const weeks = timeLeft > 0 ? Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 7)) : 0
  const days = timeLeft > 0 ? Math.floor(timeLeft / (1000 * 60 * 60 * 24)) : 0
  const hours = timeLeft > 0 ? Math.floor(timeLeft / (1000 * 60 * 60)) : 0;
  const minutes = timeLeft > 0 ? Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)) : 0;

  return (
    <Typography {...props}>
      {weeks ? weeks + ' weeks' : days ? days + ' days' : hours ? hours + 'h' : minutes + 'm'} ago
    </Typography>
  )
}

export default memo(TimeLive)