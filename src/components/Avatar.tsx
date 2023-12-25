import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';
import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'
interface IProps extends AvatarProps {
  username: string;
  saturation?: string | number;
  lightness?: string | number;
  avatarUrl?: string;
}
const Avatar = ({ username, saturation, lightness, avatarUrl, sx, ...props }: IProps) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<MuiAvatar
    src={avatarUrl || svgURI}
    sx={{
      backgroundColor: '#fff',
      border: avatarUrl ? 0 : 1,
      borderColor: 'secondary.main',
      ...sx
    }}
    {...props}
  />)
}
export default Avatar
