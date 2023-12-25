import { createProposalVote } from "./../../../api/proposal/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/index";
import { IAction } from "@/types/util.types";

export interface CreateProposalParams {
  title: string;
  description: string;
  image?: File;
  encodeData: string[];
  actionsData: IAction[];
}

const initialState = {
  title: "",
  description: "",
  encodeData: [],
  actionsData: [],
} as CreateProposalParams;

export const proposal = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setProposalInfo: (
      state: CreateProposalParams,
      actions: PayloadAction<any>
    ) => {
      return {
        ...state,
        title: actions.payload.title,
        description: actions.payload.description,
        image: actions.payload.image,
      };
    },
    setEncodeData: (
      state: CreateProposalParams,
      actions: PayloadAction<any>
    ) => {
      return {
        ...state,
        encodeData: actions.payload.encodeData,
      };
    },
    setActionsData: (
      state: CreateProposalParams,
      actions: PayloadAction<any>
    ) => {
      return {
        ...state,
        actionsData: actions.payload.actionsData,
      };
    },
    resetProposalData: (state: CreateProposalParams) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setProposalInfo,
  setEncodeData,
  setActionsData,
  resetProposalData,
} = proposal.actions;

export const getProposal = (state: RootState) => state.proposal;

export default proposal.reducer;
