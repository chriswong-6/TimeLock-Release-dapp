import { Contract, ContractInterface } from "@ethersproject/contracts";
import Web3 from "web3";
import Creator from "../../build/contracts/Call.json" assert { type: "json" };
import Receiver from "../../build/contracts/Other.json" assert { type: "json" };
import Assemble from "../../build/contracts/Assemble.json" assert { type: "json" };
import { AbiItem } from 'web3-utils'
//import { getAddress } from "@ethersproject/address";
import { Signer } from "ethers";

// export function isAddress(value: any): string | false {
//   try {
//     return getAddress(value);
//   } catch {
//     return false;
//   }
// }



// export const getCreatorContract = (
//   CreatorNetworkId: number,
//   signer: Signer
// ) => {
//   console.log(CreatorNetworkId, "CreatorNetworkId");
//   let CreatorAddress = Creator.networks[CreatorNetworkId]?.address;
//   console.log(CreatorAddress, "Creator.abi");
//   if (!CreatorAddress) {
//     return null;
//   }
//   return new Contract(CreatorAddress, Creator.abi, signer);
// };



export const getCreatorContract = async() => {
  var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  let account = await web3.eth.requestAccounts();
  let CreatorAbi = Creator.abi
  let CreatorNetworkId = await web3.eth.net.getId();

  let CreatorAddress = await Creator.networks[CreatorNetworkId].address;

  let Creatortoken = new web3.eth.Contract(CreatorAbi as AbiItem[],CreatorAddress);
  //console.log(Creatortoken)
  return {
    Creatortoken: Creatortoken,
    account: account[0]
  };
};






export const getReceiverContract = (address: string, signer: Signer) => {
  return new Contract(address, Receiver.abi, signer);
};




// export const getAssembleContract = (
//   CreatorNetworkId: number,
//   signer: Signer
// ) => {
//   let AssembleAddress = Assemble.networks[CreatorNetworkId]?.address;
//   if (!AssembleAddress) {
//     return null;
//   }
//   return new Contract(AssembleAddress, Assemble.abi, signer);
// };

export const getAssembleContract = async() => {
  var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  let account = await web3.eth.requestAccounts();
  let AssembleAbi = Assemble.abi
  let AssemblerNetworkId = await web3.eth.net.getId();
  let AssemblerAddress = Assemble.networks[AssemblerNetworkId].address;
  let AssembleToken = new web3.eth.Contract(AssembleAbi as AbiItem[],AssemblerAddress);

  //let Creatortoken = new web3.eth.Contract(CreatorAbi as AbiItem[],CreatorAddress);
  //console.log(Creatortoken)
  return {
    AssembleToken: AssembleToken,
    account: account[0]
  };
};