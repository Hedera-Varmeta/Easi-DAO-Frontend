import { IProposal } from "@/api/proposal";
import { IAction } from "@/types/util.types";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Card,
  Box,
} from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import Description from "./Description";
import Comments from "./Comments";
import BigNumber from "bignumber.js";

interface Props {
  proposal?: IProposal;
}

export const Detail: FC<Props> = ({ proposal }) => {
  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const handleChange = (event: SyntheticEvent, newValue: 2 | 0 | 1) => {
    setTab(newValue);
  };
  const [actions, setActions] = useState<any[]>([]);
  useEffect(() => {
    if (!proposal) return;
    setActions(JSON.parse(String(proposal?.data)));
  }, [proposal]);

  return (
    <>
      <Card sx={{ padding: 2 }}>
        <Stack sx={{ padding: 1 }}>
          <Typography variant="h4" mb={2}>
            Details
          </Typography>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontWeight: 400, color: "#111111" }}
              label="Description"
              value={0}
            />
            <Tab
              sx={{ fontWeight: 400, color: "#111111" }}
              label="Actions"
              value={1}
            />
            <Tab
              sx={{ fontWeight: 400, color: "#111111" }}
              label="Comment"
              value={2}
            />
          </Tabs>
          {tab === 0 && <Description description={proposal?.proposalDescription} imageUrl={proposal?.imageUrl} />}
          {tab === 1 && (
            <>
              {actions.map((item, index) => {
                return (
                  <Stack key={item.address}>
                    <Typography fontWeight={500} color={"#8364e2"}>
                      Action #{index + 1}
                    </Typography>
                    <ActionItem action={item} />
                  </Stack>
                );
              })}
            </>
          )}
          {tab === 2 && (<Comments />)}
        </Stack>
      </Card>
    </>
  );
};

interface ActionProps {
  action: IAction;
}

export const ActionItem: FC<ActionProps> = ({ action }) => {
  const keys = Object.keys(action?.data);
  const values = Object.values(action?.data);
  return (
    <>
      <Card sx={{ padding: 2, mt: 1, mb: 2 }}>
        <Typography mb={2}>
          <strong>Action Type:</strong> {action.type}
        </Typography>
        <Typography my={2}>
          <strong>Call datas:</strong>
        </Typography>

        <Grid container>
          <Grid item xs={3}>
            <Stack direction="column" spacing={2}>
              {Array.isArray(keys)
                ? keys.map((item: any, index: number) => {
                  return (
                    <Typography key={index} fontWeight={500}>
                      {item}{" "}
                    </Typography>
                  );
                })
                : null}
            </Stack>
          </Grid>
          <Grid item xs={6} md={8}>
            <Stack direction="column" spacing={2} >
              {Array.isArray(values)
                ? values?.map((item: any, index: number) => {
                  return (
                    <Typography fontSize={14} fontWeight={500} color={"#98A9B9"} key={index}>
                      {typeof item === 'number' ? BigNumber(item).toFixed() : item}
                    </Typography>
                  );
                })
                : null}
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
