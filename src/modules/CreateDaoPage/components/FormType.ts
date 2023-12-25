import * as yup from "yup";
export const GovernorType = [
  {
    value: "Standard Gorvemor",
    label: "Standard Gorvemor",
  },
  {
    value: "Gorvemor Quorum Fraction",
    label: "Gorvemor Quorum Fraction",
  },
  {
    value: "Permission Governor",
    label: "Permission Governor",
  },
];

export const TokenType = [
  {
    value: "ERC20 Votes",
    label: "ERC20 Votes",
  },
  {
    value: "Permissioned ERC20 Votes",
    label: "Permissioned ERC20 Votes",
  },
  {
    value: "ERC721 Votes",
    label: "ERC721 Votes",
  },
  {
    value: "Permissioned ERC721 Votes",
    label: "Permissioned ERC721 Votes",
  },
];

export const GovernanceSettings = [
  {
    name: "initialProposalThreshold",
    label: "Proposal threshold",
    placeHolder: "Threshold",
  },
  {
    name: "initialVotingDelay",
    label: "Voting Delay",
    placeHolder:
      "How long after a proposal is created shuold votin power be fixed",
  },
  {
    name: "initialVotingPeriod",
    label: "Voting Period",
    placeHolder: "How long does a proposal reamin open to votes",
  },
  {
    name: "quorumNumerator",
    label: "Quorum fraction",
    placeHolder: "Quorum require to pass",
  },
  {
    name: "Minimum delay time",
    label: "Minimum delay time",
    placeHolder: "Delay time before execute proposal",
  },
  {
    name: "Proposer addresses",
    label: "Proposer addresses",
    placeHolder: "[0x000,0x000]",
  },
  {
    name: "Excutors addresses",
    label: "Excutors addresses",
    placeHolder: "[0x000,0x000]",
  },
  {
    name: "Admin address",
    label: "Admin address",
    placeHolder: "0x0000",
  },
];

export const VoteTokenSetting = [
  {
    name: "tokenName",
    label: "Name",
    placeHolder: "Token Name",
  },
  {
    name: "symbol",
    label: "Symbol",
    placeHolder: "TKN",
  },
  {
    name: "Decimals",
    label: "Decimals",
  },
];

export const StandardGovernor = {
  ERC20VotesStandard: 1,
  ERC721VotesStandard: 2,
};

export const getFormCreateDAOSchema = () => {
  return yup
    .object({
      name: yup.string().trim().max(255).label("DAO Name").required(),
      description: yup.string().trim().label("Description").required(),
      governorType: yup
        .number()
        .label("Governor Type")
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .required(),
      governorSetting: yup
        .number()
        .label("Vote Token Type")
        .transform((value) => (Number.isNaN(value) ? undefined : value))
        .required(),
      logo: yup.mixed().optional(),
      quorumNumerator: yup
        .number()
        .min(0)
        .max(100)
        .required()
        .label("Quorum Numerator")
        .transform((value) => (Number.isNaN(value) ? undefined : value)),
      initialVotingDelay: yup
        .number()
        .integer()
        .min(0)
        .required()
        .label("Voting Delay")
        .transform((value) => (Number.isNaN(value) ? undefined : value)),
      initialVotingPeriod: yup
        .number()
        .integer()
        .moreThan(0)
        .required()
        .label("Voting Period")
        .transform((value) => (Number.isNaN(value) ? undefined : value)),
      initialProposalThreshold: yup
        .number()
        .integer()
        .min(0)
        .required()
        .label("Proposal threshold")
        .transform((value) => (Number.isNaN(value) ? undefined : value)),
      tokenName: yup.string().trim().required().label("Token Name"),
      symbol: yup.string().trim().required().label("Symbol"),
      timelockMinDelay: yup
        .number()
        .integer()
        .min(0)
        .required()
        .label("Time Lock Min Delay")
        .transform((value) => (Number.isNaN(value) ? undefined : value)),
      distributeTokens: yup
        .array()
        .of(
          yup.object({
            address: yup.string().trim().label("Address").required(),
            amount: yup
              .number()
              .label("Amount")
              .transform((value) => (Number.isNaN(value) ? undefined : value))
              .moreThan(0)
              .when("$governorSettingName", ([governorSettingName], schema) =>
                governorSettingName === "ERC20VotesStandard"
                  ? schema.required()
                  : schema
              ),
            tokenUri: yup.string().trim().label("Token Uri"),
          })
        )
        .label("Distribute Tokens")
        .min(1)
        .required(),
    })
    .required();
};
