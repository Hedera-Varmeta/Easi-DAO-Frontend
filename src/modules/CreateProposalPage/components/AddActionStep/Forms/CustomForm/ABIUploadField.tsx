import { Box, Button, Stack, Typography } from '@mui/material';
import React, { ReactNode, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { SelectAbiStyled } from './styled';
import { toast } from 'react-hot-toast';
import ErrorHelper from '@/components/ErrorHelper';

type Props = {
  name: string;
  label?: any;
  description?: string | ReactNode;
  defaultValue?: string;
}

const ABIUploadField = ({ name, defaultValue = "", label, description, ...props }: Props) => {
  const refInputFile = useRef<HTMLInputElement>(null)

  const onToggleFile = () => {
    refInputFile.current?.click()
  }

  const onGetContentFile = (file: File, callback: (contentValue: any) => void) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = e => {
        const content = e.target?.result;
        if (!content) throw new Error("Not found content");

        const parseFileContent = JSON.parse(content as string)
        if (!parseFileContent?.contractName || !parseFileContent?.abi || !Array.isArray(parseFileContent?.abi)) throw new Error("Wrong format");

        callback(parseFileContent);
      };
    } catch (error) {
      toast.error('File wrong format')
    }
  }

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack spacing={1} sx={{ width: "100%" }}>
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
            {description && typeof description === 'string' ? (
              <Typography
                fontWeight={500}
                fontSize={13}
                color="var(--text-des-color)"
                fontStyle="italic"
              >
                {description}
              </Typography>
            ) : description}
            <SelectAbiStyled>
              <Box flex={1}>
                <Typography>
                  {field.value ? field.value?.contractName ?? '' : 'Select your ABI file'}
                </Typography>
              </Box>
              <Button variant="contained" onClick={onToggleFile}>
                Choose file
              </Button>
              <input
                type="file"
                name={name}
                ref={refInputFile}
                style={{ display: 'none' }}
                accept='.json'
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0) {
                    const file = e?.target?.files[0];
                    onGetContentFile(file, (fileContent) => {
                      field.onChange(fileContent)
                    })
                  }

                  e.target.value = '';
                }}
              />
            </SelectAbiStyled>
            <ErrorHelper message={error?.message} />
          </Stack>
        )
      }}
    />
  );
};

export default ABIUploadField;