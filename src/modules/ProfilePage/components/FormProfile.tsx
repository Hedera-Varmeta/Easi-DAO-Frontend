import FormWrapper from "@/form-fields/FormWrapper";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useWindowSize } from "hooks/useWindowSize";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomImage, CustomTextField, CustomUpload } from "./styled";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { CSSProperties } from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import {
  ILoginResponse,
  IUpdateUserInfoRequest,
  updateUserInfo,
  useGetUserInfo,
} from "@/api/user";
import toast from "react-hot-toast";
import { IError } from "@/api/types";
import { convertToFormData } from "@/utils/common";
import { useAppSelector } from "hooks/useRedux";
import { getIsAuthenticator } from "@/store/ducks/auth/slice";

const style: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "40px",
  cursor: "pointer",
  color: '#fff',
};

interface IFormProps extends FormData {
  image: any;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  wallet: string;
}

export const FormProfile = () => {
  const isAuthenticator = useAppSelector(getIsAuthenticator);
  const [imageUrl, setImageUrl] = useState<string>("");
  const queryClient = useQueryClient();

  const { data } = useGetUserInfo({ enabled: !!isAuthenticator });

  useEffect(() => {
    if (data) {
      setImageUrl(data.avatarUrl)
    }
  }, [data])

  const methods = useForm<IFormProps>({
    mode: "onSubmit",
    defaultValues: {
      wallet: data?.accountId,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    methods.setValue("image", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl); // Set the image URL in your component's state or variable
    }
  };

  const { mutate: update } = useMutation(updateUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user/info"] })
      toast.success("Update profile successfully !!!");
    },
    onError: (error: IError) => {
      toast.error(error.meta.message);
    },
  });

  const onSubmit: SubmitHandler<IFormProps> = (data: IFormProps) => {
    const request: any = {
      ...data,
    };
    delete request.wallet;
    update(convertToFormData(request));
  };

  if (!data) {
    return null;
  }

  return (
    <Grid item md={12} xs={12}>
      <Stack spacing={4} height="100%">
        <FormWrapper methods={methods} onSubmit={onSubmit}>
          <Stack spacing={4} mt={5}>
            <Stack spacing={2}>
              <Typography variant="h5">Profile Picture</Typography>
              {!imageUrl && (
                <CustomUpload>
                  <AddIcon sx={{ fontSize: '60px' }} />
                  <TextField
                    onChange={handleImageUpload}
                    type="file"
                    name="file"
                    sx={{ display: "none" }}
                  />
                </CustomUpload>
              )}
              {imageUrl && (
                <Box position="relative" width={240} height={240}>
                  <CustomImage src={imageUrl} alt="Uploaded" />
                  <DeleteOutlinedIcon
                    style={style}
                    onClick={() => setImageUrl("")}
                  />
                </Box>
              )}
              <Typography sx={{ opacity: 0.5 }}>
                Recommended resolution of 640*640 with file size less than 2MB,
                keep visual elements centered.
              </Typography>
            </Stack>
            <Typography variant="h5">Account Detail</Typography>
            <CustomTextField
              variant="standard"
              name="wallet"
              label="Wallet"
              style={{ border: "none", }}
              placeholder="Wallet"
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />

            <CustomTextField
              variant="standard"
              name="firstName"
              label="First Name"
              style={{ border: "none" }}
              placeholder={data.firstName ? data.firstName : "First Name"}
              InputLabelProps={{ shrink: true }}
            />
            <CustomTextField
              variant="standard"
              name="lastName"
              label="Last Name"
              style={{ border: "none" }}
              placeholder={data.lastName ? data.lastName : "Last Name"}
              InputLabelProps={{ shrink: true }}
            />
            <CustomTextField
              variant="standard"
              name="phone"
              label="Phone"
              style={{ border: "none" }}
              placeholder={data.phone ? data.phone : "Phone"}
              InputLabelProps={{ shrink: true }}
            />
            <CustomTextField
              variant="standard"
              name="dateOfBirth"
              label="Date Of Birth"
              style={{ border: "none" }}
              placeholder="Date of birth"
              InputLabelProps={{ shrink: true }}
              type="date"
            />
          </Stack>
          <Stack flexDirection="row" justifyContent="center" my={4}>
            <Button variant="contained" type="submit" size="large">
              Update Profile
            </Button>
          </Stack>
        </FormWrapper>
      </Stack>
    </Grid>
  );
};
