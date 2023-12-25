import React, { HtmlHTMLAttributes } from 'react';
import { TagContainer } from './styled';

type Props = {
  title: string;
  size?: "xs" | "sm" | "md";
  bgcolor?: string;
  textColor?: string;
} & HtmlHTMLAttributes<"div">

const Tag = ({
  title,
  size = 'sm',
  bgcolor,
  textColor,
}: Props) => {
  return (
    <TagContainer size={size} bgcolor={bgcolor} textColor={textColor}>
      {title}
    </TagContainer>
  );
};

export default Tag;