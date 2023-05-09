import { FC, useEffect, useState } from "react";
import Web3 from "web3";
import s from "@/styles/Twitter.module.scss";
import { getCreatorContract } from "@/hooks/useContract";
//import EthCrypto from 'eth-crypto';


import Script from "next/script";
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
declare var secrets: any;
declare var window: any;


const PublishMessage: FC = ({}) => {
  const [plaintext, setPlaintext] = useState("");
  const [lockTime, setLockTime] = useState("");
  const [holderthre, setHolderthre] = useState("");
  const [holdernum, setHoldernum] = useState("");
  const [networkId, setNetworkId] = useState<number>();
  const [Creatortoken, setCreatorToken] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  // const [ownerList, setOwnerList] = useState<number[]>([]);
  // const [threshold, setThreshold] = useState<number>(0);

  async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: 'SHA-256'
        },
        true,
        ['encrypt', 'decrypt']
    );
    return keyPair;
  }
  async function encryptMessage(publicKey, message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    console.log(data);
    const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, data);
    console.log(encrypted);
    return new Uint8Array(encrypted);
  }

  // async function encryptMessage(publicKey, message, maxChunkSize = 190) {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(message);
    
  //   // Split the data into smaller chunks
  //   const chunks = [];
  //   for (let i = 0; i < data.length; i += maxChunkSize) {
  //     chunks.push(data.slice(i, i + maxChunkSize));
  //   }
  
  //   // Encrypt each chunk separately
  //   const encryptedChunks = await Promise.all(
  //     chunks.map(async chunk => {
  //       const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, chunk);
  //       return new Uint8Array(encrypted);
  //     })
  //   );
  //   const res = encryptedChunks;
  //   return res;
  // }
  


  async function decryptMessage(privateKey, encryptedMessage) {
    const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, encryptedMessage);
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
  // async function decryptMessage(privateKey, encryptedChunks) {
  //   // Decrypt each chunk separately
  //   const decryptedChunks = await Promise.all(
  //     encryptedChunks.map(async chunk => {
  //       const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, chunk);
  //       return new Uint8Array(decrypted);
  //     })
  //   );
  //   console.log(decryptedChunks);
  
  //   // Concatenate decrypted chunks to reconstruct the original message
  //   const decryptedData = new Uint8Array(decryptedChunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));
  //   console.log(decryptedData);
  //   // Convert the decrypted data back to a string
  //   const decoder = new TextDecoder();
  //   const decryptedMessage = decoder.decode(decryptedData);
  //   //console.log(decryptedMessage);
  //   return decryptedMessage;
  // }

  
  

  
  
  
  const ResetPublish = async () =>{
    let AssembleAddress = await Creatortoken.methods.AssembleAddress().call();
    const AddressArray = await Creatortoken.methods.getList().call();
    const ownerList = JSON.parse(localStorage.getItem("OwnerList"));
    const threshold = Number(localStorage.getItem("holderthre"));
    //console.log(ownerList);
    for(let i=0; i<threshold;i++){
      await Creatortoken.methods.ClearHolderFrag(AddressArray[ownerList[i]]).send({from: account});
    }
    await Creatortoken.methods.ClearAssembleFrag(AssembleAddress).send({from: account});
    


  

    

    // (async () => {
    //   const keyPair = await generateKeyPair();
    //   console.log('Public Key:', keyPair.publicKey);
    //   console.log('Private Key:', keyPair.privateKey);
  
    //   const message = 'Hello, this is a secret message!';
    //   console.log('Original Message:', message);
  
    //   const encryptedMessage = await encryptMessage(keyPair.publicKey, message);
    //   console.log('Encrypted Message:', encryptedMessage);
  
    //   const decryptedMessage = await decryptMessage(keyPair.privateKey, encryptedMessage);
    //   console.log('Decrypted Message:', decryptedMessage);
    // })();



  }

  const handlePublish = async () => {
    try {
      if (Number.isNaN(holderthre)) {
        return console.error("You should input number");
      }
      //const { Creatortoken, account } = await getCreatorContract();
      // const publicKey = await EthCrypto.publicKeyByPrivateKey(account.privateKey);
      // console.log('Public Key:', publicKey);


      const AddressArray = await Creatortoken.methods.getList().call();

      const MessageHash = await Creatortoken.methods.getMessageHash(plaintext).call();

      
      const Owner = await Creatortoken.methods.owner().call();

      const sign = await web3.eth.personal.sign(MessageHash,Owner, "");

      await Creatortoken.methods.SendSignatureToVerifier(MessageHash, sign).send({from: account});


      let Fragments = secrets.str2hex(plaintext);

      let shares = await secrets.share(
        Fragments,
        Number(holdernum),
        Number(holderthre)
      );
      //console.log(shares)
      //define a dictionary of public key and private key
      const keydic = {};
      for(let i = 0; i< Number(holderthre); i++){
        const keyPair = await generateKeyPair();
        keydic[`PublicKey${i}`]=keyPair.publicKey;
        keydic[`PrivateKey${i}`]=keyPair.privateKey;

      }
      //use n holder public key to encrypt each sharings.
      var EncryptShares = new Array();
      for(let i=0; i<Number(holderthre); i++){
        let TempMessage = shares[i];
        //let FirstEncrypt = await encryptMessage(keydic['PublicKey0'], TempMessage);
        for(let j=0; j<Number(holderthre); j++){
          TempMessage = await encryptMessage(keydic[`PublicKey${j}`], TempMessage);
          console.log(TempMessage,'第n层加密');
          const decryptedMessage = await decryptMessage(keydic[`PrivateKey${j}`], TempMessage);
          console.log(decryptedMessage);
        }
        EncryptShares.push(TempMessage);
       

        // for(let k=0; k<Number(holderthre); k++){
        //   //console.log(keydic[`PrivateKey${k}`]);
        //   const decryptedMessage = await decryptMessage(keydic[`PrivateKey${k}`], EncryptShares);
        //   console.log('Decrypted Message:', decryptedMessage);
        // }
      } 
      console.log(EncryptShares[0],'数组0');
      
      for(let k = (Number(holderthre)-1); k>=0; k--){
          const decryptedMessage = await decryptMessage(keydic[`PrivateKey${k}`], EncryptShares[0]);
          console.log(decryptedMessage);
      }
      

      





      let RandomArray = [...new Array(AddressArray.length)].map(
        (item, idx) => idx
      );
      let FragIndexArr = [...new Array(Number(holdernum))].map(
        (item, idx) => idx
      );
      const OwnerList = [];

      for (let i = 0; i < Number(holderthre); i++) {
        const RandomNumber =
          RandomArray[Math.floor(Math.random() * RandomArray.length)];
        const RandomNumber2 =
          FragIndexArr[Math.floor(Math.random() * FragIndexArr.length)];
        OwnerList.push(RandomNumber);
        let tempAddress = AddressArray[RandomNumber];

        await Creatortoken.methods.callSetX(tempAddress, shares[RandomNumber2], lockTime).send({from:account})

        RandomArray = RandomArray.filter((value) => {
          return value != RandomNumber;
        });
        FragIndexArr = FragIndexArr.filter((value) => {
          return value != RandomNumber2;
        });
      }
      //console.log(Number(holderthre), OwnerList);

      // setThreshold(Number(holderthre));
      // setOwnerList(OwnerList);

      localStorage.setItem("OwnerList", JSON.stringify(OwnerList));
      localStorage.setItem("holderthre", holderthre.toString());
      await Creatortoken.methods.GetValue(Number(holderthre), OwnerList).send({from:account});
      //await tx.wait();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    async function fetchContract() {
      const { Creatortoken, account } = await getCreatorContract();
      setCreatorToken(Creatortoken);
      setAccount(account);
    }
    const web3 = new Web3(window.ethereum);
    web3.eth.net.getId().then((res) => {
      setNetworkId(Number(res));
    });
    fetchContract();
  }, []);

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/secret-sharing.js@1.3.1/build/secret-sharing.min.js" />
      <div className={s.publish_message_wrap}>
        <div className={s.publish_message}>
          <div>
            <div>Your Plaintext</div>
            <input
              type="text"
              value={plaintext}
              onChange={(e) => {
                setPlaintext(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Lock Time</div>
            <input
              type="text"
              value={lockTime}
              onChange={(e) => {
                setLockTime(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Minimum assembler number </div>
            <input
              type="text"
              value={holderthre}
              onChange={(e) => {
                setHolderthre(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Encrypt user number</div>
            <input
              type="text"
              value={holdernum}
              onChange={(e) => {
                setHoldernum(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={s.sender_right}>
          <div className={s.sender_button} onClick={handlePublish}>
            PublishMessage
          </div>
          <div className={s.reset_button} onClick={ResetPublish}>
            ResetMessage
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishMessage;
