import { ITypeTreasury } from "@/api/dao";
import { Show } from "@/components/Show";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { memo, useMemo, useState } from "react";
import TypeField from "./TypeField";
import TextField from "@/form-fields/TextField";
import Tag from "@/components/Tag";
import { useFormContext } from "react-hook-form";
import { shortenAddress } from "@/utils/common";
import EditIcon from "@mui/icons-material/Edit";
import { EditBoxStyled, RemoveBoxStyled } from "./styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { TOKEN_TYPE } from "@/utils/constants";

type Props = {
  types: ITypeTreasury[];
  index: number;
  onRemove: () => void;
};

const ImportTokenItem = ({ types, index, onRemove }: Props) => {
  const [isEdit, setIsEdit] = useState(true);

  const { watch, setValue } = useFormContext();

  const { typeId, token, tokenName, treasuryType } = watch(`arr.${index}`);

  const currentType = useMemo(
    () => types.find((typeItem) => typeItem.id === typeId)?.typeName ?? "",
    [typeId, types]
  );

  return (
    <Box>
      <Typography fontSize={12} color="var(--text-des-color)">
        {`Token #${index + 1}`}
      </Typography>
      <Box
        width="100%"
        gap="20px"
        border="1px solid #EAECF0"
        borderRadius="5px"
        p="10px"
        bgcolor="#fff"
      >
        <Show when={isEdit}>
          <Stack gap="20px">
            <TypeField
              name={`arr.${index}.typeId`}
              label="Type Treasury"
              types={types}
              onChange={(typeItem) =>
                setValue(`arr.${index}.treasuryType`, typeItem.typeName)
              }
            />

            <TextField
              label="Token Address"
              name={`arr.${index}.token`}
              placeholder="address"
            />

            <TextField
              label="Token Name"
              name={`arr.${index}.tokenName`}
              placeholder="Token name"
            />

            <Show when={treasuryType === TOKEN_TYPE.ERC1155}>
              <TextField
                label="Token ID"
                name={`arr.${index}.tokenId`}
                placeholder="Token ID"
              />
            </Show>

            <Stack direction="row" gap="10px" mt="15px">
              <Button
                onClick={() => setIsEdit(false)}
                variant="outlined"
                size="small"
                disabled={!typeId || !token || !tokenName}
                fullWidth
              >
                Save
              </Button>

              <Button
                onClick={onRemove}
                variant="contained"
                color="error"
                size="small"
                fullWidth
              >
                Remove
              </Button>
            </Stack>
          </Stack>
        </Show>

        <Show when={!isEdit}>
          <Stack direction="row">
            <Grid container spacing="10px" alignItems="center">
              <Grid item xs={8} container spacing="10px" alignItems="center">
                <Grid item xs={12}>
                  <Tag title={currentType} size="xs" />
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography fontSize={12} color="var(--text-des-color)">
                      Token Name
                    </Typography>
                    <Typography fontWeight="bold">{tokenName}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography fontSize={12} color="var(--text-des-color)">
                      Address
                    </Typography>
                    <Typography fontWeight="bold">
                      {shortenAddress(token, 5)}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item container xs={4} spacing="10px" alignItems="center">
                <Grid
                  item
                  xs={6}
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                  gap="5px"
                >
                  <EditBoxStyled onClick={() => setIsEdit(true)}>
                    <EditIcon sx={{ fontSize: 18 }} />
                  </EditBoxStyled>
                  <Typography fontSize={12} color="var(--text-des-color)">
                    Edit
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                  gap="5px"
                >
                  <RemoveBoxStyled color="error" onClick={onRemove}>
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </RemoveBoxStyled>
                  <Typography fontSize={12} color="var(--text-des-color)">
                    Remove
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Show>
      </Box>
    </Box>
  );
};

export default memo(ImportTokenItem);
