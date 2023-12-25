import styled from "@emotion/styled";
import { Add, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { FC, ReactNode, memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: any;
  description?: string | ReactNode;
  size?: number;
  optional?: boolean;
};

const LogoUpload: FC<Props> = ({ name, label, description, size = 150, optional }) => {
  const { setValue, getValues } = useFormContext<any>();
  const currentImage = getValues("logo")
  const [imageUrl, setImageUrl] = useState<string>(currentImage ? URL.createObjectURL(currentImage) : "");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue(name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Stack spacing={1} sx={{ width: "100%" }} direction="row" alignItems="flex-start">
          <Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {label && (
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor={name}
                >
                  {label}
                </Typography>
              )}
              {optional && (
                <Typography
                  variant="subtitle2"
                  component="label"
                  fontSize={13}
                  color="var(--text-des-color)"
                  sx={{
                    position: 'relative',
                    '&::before': {
                      borderRadius: '5px',
                      backgroundColor: 'var(--text-des-color)',
                      width: '120%',
                      height: '100%',
                      position: 'absolute',
                      content: '""',
                      top: '50%',
                      left: '50%',
                      opacity: 0.2,
                      transform: 'translate(-50%, -50%)'
                    }
                  }}
                >
                  optional
                </Typography>
              )}
            </Stack>
            {description && typeof description === 'string' ? (
              <Typography
                fontWeight={500}
                fontSize={12}
                color="var(--text-des-color)"
                fontStyle="italic"
              >
                {description}
              </Typography>
            ) : description}
            {!imageUrl &&
              (<CustomUpload size={size}>
                <Add />
                <TextField
                  onChange={handleImageUpload}
                  type="file"
                  name="file"
                  sx={{ display: "none" }}
                />
              </CustomUpload>)}
            {imageUrl && (
              <Box position="relative" width={size} height={size}>
                <CustomImage src={imageUrl} alt="Uploaded" size={size} />
                <DeleteOutlined
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    color: '#fff',
                  }}
                  onClick={() => {
                    setValue(name, undefined)
                    setImageUrl("")
                  }}
                />
              </Box>)}
          </Stack>
        </Stack>
      )}
    />
  );
};

export default memo(LogoUpload);

const CustomImage = styled.img<{ size: string | number }>(({ theme, size }) => ({
  width: size,
  height: size,
  borderRadius: "8px",
  border: "1.5px dashed #d9d9d9",
}));

const CustomUpload = styled.label<{ size: string | number }>(({ theme, size }) => ({
  width: size,
  height: size,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  border: "1.5px dashed #d9d9d9",
  background: "#fafafa",
  cursor: 'pointer',
  transition: 'all 0.3s',
  backgroundColor: '#fff',

  '&:hover': {
    backgroundColor: '#ecf0f5',
    transition: 'all 0.3s'
  }
}));
