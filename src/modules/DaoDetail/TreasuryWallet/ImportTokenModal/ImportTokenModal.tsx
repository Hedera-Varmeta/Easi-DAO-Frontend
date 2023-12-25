import { ITokenImport, importToken, useGetListTypeTreasury } from "@/api/dao";
import ErrorHelper from "@/components/ErrorHelper";
import BaseModal from "@/components/Modal/BaseModal";
import FormWrapper from "@/form-fields/FormWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Stack
} from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { getFormTokenImportSchema } from "./FormTypes";
import ImportTokenItem from "./ImportTokenItem";

type FormProps = {
  arr: ITokenImport[];
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ImportTokenModal = ({ open, setOpen }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { data: listTypeTreasury } = useGetListTypeTreasury(
    { page: 1, limit: 10 },
    { enabled: !!id }
  );

  const initToken = {
    typeId: null,
    treasuryType: null,
    daoId: Number(id),
    token: "",
    tokenName: "",
  };

  const methods = useForm<FormProps>({
    defaultValues: {
      arr: [initToken],
    },
    resolver: yupResolver(getFormTokenImportSchema),
    mode: 'onChange',
  });

  const {
    control,
    formState: { errors },
    trigger,
    getValues
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arr",
  });

  const onClose = () => {
    setOpen(false);
    methods.reset();
  };

  const { mutate, isLoading } = useMutation(importToken, {
    onSuccess: () => {
      toast.success("Import success!");
      queryClient.invalidateQueries({
        queryKey: ['/dao/list-treasury']
      })
      onClose();
    },
    onError: () => {
      toast.error("Import Failed!");
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    mutate(data.arr);
  };

  const handleAdd = async () => {
    const validate = await trigger(['arr']);
    const arr = getValues('arr')

    if (arr.length === 0 || validate) {
      append(initToken);
    }
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Import token"
    >
      <FormWrapper methods={methods} onSubmit={onSubmit}>
        <Stack flex={1} spacing="10px">
          {fields.map((item, index) => (
            <ImportTokenItem
              key={item.id}
              types={listTypeTreasury?.list ?? []}
              index={index}
              onRemove={() => handleRemove(index)}
            />
          ))}
          <ErrorHelper message={errors?.arr?.message} />
          <Button
            variant="contained"
            sx={{ mx: "auto", mt: 2 }}
            onClick={() => handleAdd()}
            fullWidth
          >
            + Add more
          </Button>

          <Box>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              type="submit"
              size="large"
              fullWidth
            >
              Import
            </LoadingButton>
          </Box>
        </Stack>
      </FormWrapper>
    </BaseModal>
  );
};

export default ImportTokenModal