import { TextInput } from "@/components/TextInput";
import GovernorFactoryABI from "@/contracts/GovernorFactory.json";
import { StandardGovernor__factory } from "@/contracts/types";
import FormWrapper from "@/form-fields/FormWrapper";
import SelectField from "@/form-fields/SelectField";
import { Button, Divider, MenuItem, Stack } from "@mui/material";
import { HederaWalletsContext } from "context/HederaContext";
import { ethers } from "ethers";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CheckboxField, TextField } from "../form-fields";

type FormData = {
  firstName: string;
  lastName: string;
  male: boolean;
};

export default function Test() {
  const methods = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const { hashConnect, bladeSigner, hashConnectState } =
    useContext(HederaWalletsContext);

  const provider = hashConnect?.getProvider(
    "testnet",
    "8e5a5b12-0e68-4b97-8b8a-142ccf540d89",
    "0.0.4639236"
  );

  const { abi, bytecode } = GovernorFactoryABI;

  const test = async () => {};

  // console.log(hashConnect?.sendTransaction(hashConnectState.topic as string, {}));
  const habdle = async () => {
    // const defaultProvider = hethers.providers.getDefaultProvider("testnet");
    // const wallet = new Wallet(
    //   `0x3aa6ef2d444882aebc7a1878af59d032c03c9ea0d4983858e6916a3629568af4`, // prviate key
    //   defaultProvider
    // );
    // const connectedWallet = wallet.connectAccount(`0.0.4642372`); //acc id

    // console.log(connectedWallet.address);
    // console.log((await connectedWallet.getBalance()).toString());

    // const governorFactoryContract = new Contract(
    //   "0000000000000000000000000000000000cc4e8f",
    //   abi,
    //   connectedWallet
    // );
    // console.log(governorFactoryContract);

    // console.log(
    //   await governorFactoryContract.getAllGovernorPresets({
    //     gasLimit: 3000000,
    //   })
    // );

    // const tx = new ContractExecuteTransaction()
    //   .setContractId("0.0.13472155")
    //   .setGas(3000000)
    //   .setFunction("getAllGovernorPresets");
    // console.log(bladeSigner, await bladeSigner?.call(tx));
    if (provider) {
      const signer = hashConnect?.getSigner(provider);
      // console.log(signer, 111111111)
      // const defaultProvider = hethers.providers.getDefaultProvider("testnet");

      // const wallet = new Wallet(
      //   `0x3aa6ef2d444882aebc7a1878af59d032c03c9ea0d4983858e6916a3629568af4`, // prviate key
      //   defaultProvider
      // );
      // const connectedWallet = wallet.connectAccount(`0.0.4642372`); //acc id
      // console.log(connectedWallet, '22222222222222');

      // const contractExecTx = await new ContractExecuteTransaction()
      //   .setContractId("0.0.13356504")
      //   .setGas(3000000)
      //   .setFunction(
      //     "getAllGovernorPresets",
      //     new ContractFunctionParameters().addInt64(50 as any)
      //   )
      //   .freezeWithSigner(signer as any);
      // const contractExecSign = await contractExecTx.signWithSigner(
      //   signer as any
      // );

      // const contractExecSubmit = await contractExecSign.executeWithSigner(
      //   signer as any
      // );
      // console.log(contractExecSubmit);
      // const salt = ethers.utils.arrayify(
      //   ethers.utils.formatBytes32String("this is a salt")
      // );

      // const client = Client.forTestnet();
      // client.setOperator(
      //   AccountId.fromString("0.0.4053091"),
      //   PrivateKey.fromString(
      //     "0x168cc3d264a5296b6203d821288f4df722d2d2a3ef1f3b31b1d80a24cf0b63c4"
      //   )
      // );

      // const contractExecTx = new ContractExecuteTransaction()
      //   .setContractId("0.0.13472155")
      //   .setGas(1000000)
      //   .setFunction(
      //     "addVoteTokenPreset",
      //     new ContractFunctionParameters()
      //       .addString("ERC20VotesStandard")
      //       .addAddress("0x0000000000000000000000000000000000cd919b")
      //   )
      //   .freezeWithSigner(signer as any);
      // const contractCallResult = await (
      //   await contractExecTx
      // ).executeWithSigner(signer as any);

      // const recept = await provider.getTransactionReceipt(
      //   contractCallResult.transactionId
      // );
      // const haha = await provider.getAccountRecords("0.0.4639236");
      // console.log(signer?.getAccountInfo())
      // console.log("111111111111111",await  signer?.getAccountInfo());

      const salt = ethers.utils.arrayify(
        ethers.utils.formatBytes32String("this is a salt")
      );
      // const query = new ContractFunctionSelector("getAllGovernorPresets");

      // const haha = new AccountRecordsQuery({ accountId: "0.0.4639236" });

      // const query = new ContractCallQuery()
      //   .setContractId("0.0.13472155")
      //   .setGas(500000)
      //   .setFunction(
      //     "predictTimelockDeterministicAddress",
      //     new ContractFunctionParameters().addBytes32(salt)
      //   )
      //   .setQueryPayment(new Hbar(3));

      // //Sign with the client operator private key to pay for the query and submit the query to a Hedera network

      //   const contractExecTx = new ContractExecuteTransaction()
      //   .setContractId("0.0.13472155")
      //   .setGas(1000000)
      //   .setFunction(
      //     "addVoteTokenPreset",
      //     new ContractFunctionParameters()
      //       .addString("ERC20VotesStandard")
      //       .addAddress("0x0000000000000000000000000000000000cd919b")
      //   )
      //   .freezeWithSigner(signer as any);
      // const contractCallResult = await (
      //   await contractExecTx
      // ).executeWithSigner(signer as any);

      // Get the function value
      // const client = "" as any;
      // let getMessage2 = await query.execute(client);

      // const message = getMessage2.getString(0);
      // const abiCoder = new ethers.utils.AbiCoder();
      // abiCoder.decode("string[]", getMessage2.bytes)
      // >>>>>>>
      // const contractExecTx = new ContractExecuteTransaction()
      //   .setContractId("0.0.13389455")
      //   .setGas(3000000)
      //   .setFunction("getAllGovernorPresets")
      //   .freezeWithSigner(signer as any);
      // let getMessage1: any = await (await contractExecTx)
      //   .executeWithSigner(signer as any)
      //   .catch((e) => {
      //     console.log(e);
      //   });
      // const tokenCreateRx = await provider.getTransactionReceipt(
      //   getMessage1.transactionId
      // );

      // console.log(tokenCreateRx, "haha");
      // console.log(signer?.call(''))
      // <<<<
      // const governorFactoryContract = new Contract(
      //   "0000000000000000000000000000000000cc4e8f",
      //   GovernorFactoryABI.abi
      // );
      // console.log(
      //   await governorFactoryContract.getAllGovernorPresets({
      //     gasLimit: 3000000,
      //   })
      // );
      // const client = Client.forTestnet();
      // client.setOperator(
      //   AccountId.fromString("0.0.4639236"),
      //   PrivateKey.fromString(
      //     "0x657ce5ceaf1c293f763be2bf65726799764d49318004324b62e1e00977ef83e6"
      //   )
      // );
      // const query = new AccountInfoQuery().setAccountId("0.0.4639236");
      // const accountInfo = await query.execute(client);
      // //Print the account info to the console
      // console.log(accountInfo.balance.toString());
      // const account = AccountId.fromEvmAddress(
      //   0,
      //   0,
      //   "0xa9850664b0416ffd0bfe046a44b6a16e90c8091f"
      // );
      // const salt = ethers.utils.formatBytes32String(
      //   "saltacacacscsacascascascas"
      // );
      // console.log(salt);
      // console.log(Uint8Array.from(Buffer.from(salt, "hex")));
      // let tx = new ContractCallQuery()
      //   .setContractId("0.0.13333640")
      //   .setGas(30000)
      //   .setFunction("timelockController");
      // const contractExecTx = new ContractCallQuery()
      //   .setContractId("0.0.13356504")
      //   .setGas(30000)
      //   .setQueryPayment(new Hbar(3))
      //   .setFunction(
      //     "timelockController"
      //     // new ContractFunctionParameters().addBytes32(new Uint8Array(32).fill(10))
      //   );
      // console.log(getMessage1, "getMessage1");
      // const provider1 = hethers.providers.getDefaultProvider("testnet");
      // const balance = await provider1.getBalance("0.0.4639236");
      // console.log("-------", balance);
      // const signer1 = new All.Wallet(
      //   "3030020100300706052b8104000a04220420887a49be1c1050f89df90e0ed8a3982fb1b483525d3571733d32fbe3550bcda2",
      //   provider1
      // );
      // const contract1 = new hethers.Contract(
      //   "0.0.13356504",
      //   GovernorFactoryABI.abi,
      //   signer1
      // );
      // console.log(1111111, contract1);
      // console.log(
      //   await signer1.getBalance().catch((e) => {
      //     console.log(e);
      //   })
      // );
      // const contractWithSigner = contract1.connect(signer1 as any);
      // console.log(2222222, await contractWithSigner.timelockController());
      //   et tx2 = new ContractCallQuery()
      //   .setContractId(
      //     "0.0.13363445"
      //   )
      //   .setGas(10_000_000)
      //   .setQueryPayment(new Hbar(3))
      //   .setFunction(
      //     "getAllGovernorPresets"
      //     // new ContractFunctionParameters().addBytes32(new Uint8Array(32).fill(10))
      //   );
      // let getMessage2 = await tx.execute(client);
      // let getMessage = await tx.execute(client);
      // const timelockAddress = getMessage.getAddress(0);
      // tx = new ContractCallQuery()
      //   .setContractId(
      //     ContractId.fromSolidityAddress(
      //       "0000000000000000000000000000000000cb7488"
      //     )
      //   )
      //   .setGas(30000)
      //   .setFunction(
      //     "predictVoteTokenDeterministicAddress",
      //     new ContractFunctionParameters().addBytes32(
      //       new Uint8Array(32).fill(10)
      //     )
      //   );
      // getMessage = await tx.execute(client);
      // // Get a string from the result at index 0
      // const voteTokenAddress = getMessage.getAddress(0);
      const standardGovernor = new StandardGovernor__factory();
      // const governorInitializeData =
      //   standardGovernor.interface.encodeFunctionData("initialize", [
      //     voteTokenAddress,
      //     timelockAddress,
      //     10,
      //     10,
      //     10,
      //     10,
      //     "MyGovernor",
      //   ]);
      // const ERC20VoteToken = new ERC20VotesStandard__factory();
      // const ERC20VoteTokenInitializeData =
      //   ERC20VoteToken.interface.encodeFunctionData("initialize", [
      //     "SimpleERC20VoteToken",
      //     "SVT",
      //   ]);
      // const executeTx = new ContractExecuteTransaction()
      //   .setContractId(
      //     ContractId.fromSolidityAddress(
      //       "0000000000000000000000000000000000cb7488"
      //     )
      //   )
      //   .setGas(30000)
      //   .setFunction(
      //     "createGovernor",
      //     new ContractFunctionParameters()
      //       .addString("SimpleGovernor")
      //       .addBytes(
      //         Uint8Array.from(Buffer.from(governorInitializeData, "hex"))
      //       )
      //       .addString("SimpleERC20VoteToken")
      //       .addBytes(
      //         Uint8Array.from(Buffer.from(ERC20VoteTokenInitializeData, "hex"))
      //       )
      //       .addUint256(10000)
      //       .addAddressArray([])
      //       .addAddressArray([])
      //       .addAddress(timelockAddress)
      //       .addBytes32(new Uint8Array(32).fill(0))
      //   );
      // const submitExecTx = await executeTx.execute(client);
      // //Get the receipt of the transaction
      // const receipt = await submitExecTx.getReceipt(client);
      // //Confirm the transaction was executed successfully
      // console.log("The transaction status is " + receipt.status.toString());
      // console.log(receipt);
    }
  };

  // console.log(hashConnect, "hashConnectState");
  return (
    <Stack padding={8} spacing={3}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => test()}
      >
        Button
      </Button>
      <Divider />
      <Button variant="outlined" color="secondary" size="small">
        Button
      </Button>
      <Divider />
      <TextInput variant="outlined" />
      {/* <TextField name="alo" label={'asdasd'} /> */}

      <FormWrapper methods={methods} onSubmit={onSubmit}>
        <TextField name="firstName" label="First Name" size="medium" />
        <TextField name="lastName" label="Last Name" size="small" />
        <Divider />
        <SelectField name="lastName" defaultValue={"alex"}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectField>
        <Divider />
        <CheckboxField name="male" label="Male" />
        <Divider />
        <Button variant="outlined" color="secondary" size="small" type="submit">
          Submit
        </Button>
      </FormWrapper>
    </Stack>
  );
}
