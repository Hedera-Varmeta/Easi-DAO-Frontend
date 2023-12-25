import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { DropZoneWrapper, PreviewImage } from "./styled";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  onSuccess?: (file?: File) => void;
  accept?: Accept;
  maxSize?: number;
  name?: string;
  initFile?: string | File;
  sx?: SxProps;
  disable?: boolean;
};

export const UploadZone: FC<Props> = ({
  onSuccess,
  accept = {
    "image/*": [".jpeg", ".png", ".gif"],
  },
  maxSize,
  name,
  initFile,
  disable,
  sx,
}) => {
  const [file, setFile] = useState(initFile);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      // Do something with the files
      onSuccess && onSuccess(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
    [onSuccess]
  );

  const onDropRejected = useCallback(() => {
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewFile = useMemo(() => {
    if (!file) return undefined;
    return typeof file === "string" ? file : URL.createObjectURL(file);
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: accept,
    maxSize: maxSize,
    disabled: !!previewFile || disable,
  });

  useEffect(() => {
    setFile(initFile);
  }, [initFile]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "200px",
        border: "1px solid rgba(0,0,0,.2)",
        borderRadius: 1,
      }}
    >
      <DropZoneWrapper {...getRootProps()}>
        <input name={name} {...getInputProps()} disabled={disable} />
        {previewFile ? (
          <Stack
            sx={{
              zIndex: 2,
              color: "#fff",
              // background: "rgba(0,0,0,.6)",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
            }}
            spacing={2}
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            {!disable && (
              <DeleteIcon
                onClick={() => {
                  onSuccess && onSuccess(undefined);
                  setFile(undefined);
                }}
                sx={{
                  color: "#1967d2",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              />
            )}
          </Stack>
        ) : (
          <>
            <Stack
              sx={{ zIndex: 2 }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <CloudUploadIcon fontSize="large" />

              <Stack spacing={1}>
                <Typography align="center" fontWeight={700} fontSize="16px">
                  Drag and drop your Image here
                </Typography>
              </Stack>
            </Stack>
          </>
        )}
        {previewFile && <PreviewImage src={previewFile} />}
      </DropZoneWrapper>
    </Box>
  );
};
