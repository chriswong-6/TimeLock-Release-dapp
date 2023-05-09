import { FC, useEffect, useState, useContext} from "react";
import Web3 from "web3";
import Receiver from "../../../build/contracts/Other.json" assert { type: "json" };

import AppContext from "../../hooks/SaveContext";

import s from "@/styles/Twitter.module.scss";
import { BsChevronDown } from "react-icons/bs";
import {
  getCreatorContract,
  getAssembleContract,
} from "@/hooks/useContract";
import { AbiItem } from 'web3-utils'
import Script from "next/script";


declare var secrets: any;
declare var window: any;
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const NewMessage = ({ open }: { open: boolean }) => {

  const [text, setText] = useState("");
  const [networkId, setNetworkId] = useState<number>();

  const [Creatortoken, setCreatorToken] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const [AssembleToken, setAssembleToken] = useState<any>(null);
  const [AddressArray, setAddressArray] = useState<any[]>([]);

  const [Holderthre,setHolderthre]=useState(null);
  const [ownerList,setOwnerList] = useState(null);
  const [GetMessState, setGetMessState] = useState(false);
  const { message, setMessage} = useContext(AppContext);
  const { isMessageProcessing, setIsMessageProcessing} = useContext(AppContext);
  const {PlaintextString,setPlaintextString} = useContext(AppContext);
  const [AESLIST, setAESLIST] = useState<CryptoKey[]>([]);



  // function hexStringToByteArray(hexString) {
  //   const byteArray = new Uint8Array(hexString.length / 2);
  //   for (let i = 0; i < hexString.length; i += 2) {
  //     byteArray[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  //   }
  //   return byteArray;
  // }
  

  async function decrypt(encryptedMessage, aesKeys) {
    
    for (const aesKey of aesKeys.reverse()) {
      const iv = encryptedMessage.slice(0, 12);
      //console.log(iv,'getiv');
      const message = encryptedMessage.slice(12);
      //console.log(message,'message');
      //console.log(aesKey,'aesKey');
      const decryptedMessage = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        aesKey,
        message
      );
      //console.log(decryptedMessage,'decryptedMessage');
      encryptedMessage = new Uint8Array(decryptedMessage);
      //console.log(encryptedMessage,'encryptedMessage');
    }
    aesKeys.reverse();
    return new TextDecoder().decode(encryptedMessage);
  }
  
  const getMessage = async () => {
    //try {
      //console.log(Creatortoken.options.address);

      //let res = await AssembleToken.methods.GetValue(Creatortoken.options.address).call();

      //const Holderthre = res[0];
      //const ownerList = res[1];
      //setGetMessState(true)

      const AddressArray = await Creatortoken.methods.getList().call();
      let temp:boolean;
      //console.log(AddressArray);
      for (let num = 0; num < Holderthre; num++) {
        
        const Num = ownerList[num].toString();
        
        const ReceiverAbi = Receiver.abi;
        let temp2 = new web3.eth.Contract(ReceiverAbi as AbiItem[], AddressArray[Num]);


        await temp2.methods.lock(AssembleToken.options.address).send({from:account});
        //console.log(ownerList);
        

        //The return of Boolean determin it is null of not. 
        //console.log(await temp2.methods._secret().call());
        if(Boolean(await temp2.methods._secret().call())){
            temp = true;
        } else{
            temp = false;
        }
        //console.log(temp)
      }
      
      //assemble get encypted list
      let comb_res = await AssembleToken.methods.check1().call();
      //console.log(AESLIST)
      //console.log(comb_res,'111');
      if (comb_res.length>0){
      //console.log(comb_res[0],'222');
      //const hexString = comb_res[0].slice(2);
      //const byteArray = new Uint8Array(Buffer.from(hexString, 'hex'));
      //console.log(byteArray,'bytearray');
      //console.log(typeof(byteArray));
      //Disassemble the encrypted array loop and reassemble it back to the plaintext array
        let temp_combine = [];
        for(let i=0;i<Holderthre;i++){
          let hexString = comb_res[i].slice(2);
          const buffer = Buffer.from(hexString, "hex");
          //let octalString = new TextEncoder().encode(comb_res[i]);
          let byteArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
          //console.log(byteArray,'byteArray');
          let decryptedMessage;
          
          decryptedMessage = await decrypt(byteArray, AESLIST);
            
    
          
          temp_combine.push(decryptedMessage);
        //console.log(temp_combine);
        }


      //assemble 
        let combine_re = await secrets.combine(temp_combine);
        let combine_result = await secrets.hex2str(combine_re);
      
        setText(combine_result);
        await AssembleToken.methods.resetArrays().send({from:account});

        for(let i=0; i<Holderthre;i++){
          await Creatortoken.methods.ClearHolderFrag(AddressArray[ownerList[i]]).send({from: account});
        }
        setPlaintextString(combine_result);

      } else if(temp){
        setText('Time_Not_Satisfy');
      } else{
        setText('There is no publish message');
      }

    //} catch (error) {
      //console.log(error);
    //}
  };
  async function generateAESKey() {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    return key;
  }



  useEffect(() => {
    if(message){
      (async () =>{
        const {AssembleToken} = await getAssembleContract();
        const { Creatortoken, account } = await getCreatorContract();
        let res = await AssembleToken.methods.GetValue(Creatortoken.options.address).call();
        const AddressArray = await Creatortoken.methods.getList().call();
        const Holderthre = res[0];
        const ownerList = res[1];
        //console.log(ownerList)
        setHolderthre(Holderthre);
        setOwnerList(ownerList);
        setCreatorToken(Creatortoken);
        setAssembleToken(AssembleToken);
        setAccount(account);
        setAddressArray(AddressArray);
        

        //console.log(ownerList)
        let AesKeyList = [];
        for(let i = 0; i< Holderthre; i++){
          
          //const Num = Number(ownerList[i]);
          //console.log(Num);
          //const ReceiverAbi = Receiver.abi;
          //console.log(AddressArray);
          //console.log(AddressArray[Num]);

          //let temp2 = new web3.eth.Contract(ReceiverAbi as AbiItem[], AddressArray[Num]);
          //console.log(temp2.methods);
          const AESkey =  await generateAESKey();
          AesKeyList.push(AESkey);


        }
      //吧keylist给Publish
      setIsMessageProcessing(AesKeyList);
      //把Keylist给本文件的AESLIST
      setAESLIST(AesKeyList);
        //console.log(AesKeyList);
      setMessage(false);
      
      
          
      })();
      }
    
  }, [message]);


  useEffect( () => {

    
    



    const web3 = new Web3(window.ethereum);
    web3.eth.net.getId().then((res) => {
      setNetworkId(Number(res));
    });
  }, []);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/secret-sharing.js@1.3.1/build/secret-sharing.min.js" />
      <div className={s.new_message}>
        <h2>Assemble</h2>
        <div className={s.title}>Assemble Address</div>
        <div className={s.address}>
          {AssembleToken?.options?.address}
        </div>
        <div className={s.rrow}>
          <div>Result</div>
          <div className={s.sender_button} onClick={getMessage}>
            getMessage
          </div>
        </div>
        <div>{text}</div>
      </div>
    </>
  );
};

export default NewMessage;
