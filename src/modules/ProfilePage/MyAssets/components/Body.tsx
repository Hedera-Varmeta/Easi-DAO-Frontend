import {
  Stack
} from "@mui/material";
import DaoAssetsList from "./DaoAssetsList/DaoAssetsList";
import { useState } from "react";
import { IDAOResponse } from "@/api/dao";
import { Show } from "@/components/Show";
import AssetsList from "./AssetsList/AssetsList";

const Body = () => {
  const [currentDaoAsset, setCurrentDaoAsset] = useState<IDAOResponse>()

  const onChooseDaoAsset = (daoAsset?: IDAOResponse) => {
    setCurrentDaoAsset(daoAsset)
  }

  return (
    <Stack>
      <Show when={!currentDaoAsset}>
        <DaoAssetsList
          onChooseDaoAsset={onChooseDaoAsset}
        />
      </Show>
      <Show when={currentDaoAsset !== undefined}>
        <AssetsList
          daoAsset={currentDaoAsset}
          onBack={() => onChooseDaoAsset(undefined)}
        />
      </Show>
    </Stack>
  );
};

export default Body
