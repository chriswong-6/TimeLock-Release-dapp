import { FC, useEffect, useState, useContext} from "react";
import Web3 from "web3";
import s from "@/styles/Twitter.module.scss";
import { getCreatorContract } from "@/hooks/useContract";
import AppContext from "../../hooks/SaveContext";
import Script from "next/script";
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
declare var secrets: any;
declare var window: any;

//PublishMessage means all component but not publish function.
const PublishMessage: FC = ({}) => {
  const [plaintext, setPlaintext] = useState("");
  const [lockTime, setLockTime] = useState("");
  const [holderthre, setHolderthre] = useState("");
  const [holdernum, setHoldernum] = useState("");
  const [networkId, setNetworkId] = useState<number>();
  const [Creatortoken, setCreatorToken] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const [AESLIST, setAESLIST] = useState<CryptoKey[]>([]);
  const [Shares, setShares]= useState([]);
  const [ownerList, setownerlist]= useState([]);
  const [ShareList, setShareList]= useState([])
  const [addressArray, setaddressArray]=useState([]);
  const { isMessageProcessing, setIsMessageProcessing} = useContext(AppContext);
  const { setMessage } = useContext(AppContext);
 
  async function encrypt(message, aesKeys) {
    //encryptedMessage is uint8Array
    let encryptedMessage = new TextEncoder().encode(message);
    for (const aesKey of aesKeys) {
      const iv =  crypto.getRandomValues(new Uint8Array(12));
      const buffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        aesKey,
        encryptedMessage
      );
      // Convert ArrayBuffer to Uint8Array and store the IV along with the encrypted message
      encryptedMessage = new Uint8Array([...iv, ...new Uint8Array(buffer)]);
    }
    return encryptedMessage;
  }


  async function calculateSHA256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = "0x" +hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  
  
  
  const ResetPublish = async () =>{
    let AssembleAddress = await Creatortoken.methods.AssembleAddress().call();
    const AddressArray = await Creatortoken.methods.getList().call();
    const ownerList = JSON.parse(localStorage.getItem("OwnerList"));
    const threshold = Number(localStorage.getItem("holderthre"));
    for(let i=0; i<threshold;i++){
      await Creatortoken.methods.ClearHolderFrag(AddressArray[ownerList[i]]).send({from: account});
    }
    await Creatortoken.methods.ClearAssembleFrag(AssembleAddress).send({from: account});
  }

  const handlePublish = async () => {

      if (Number.isNaN(holderthre)) {
        return console.error("You should input number");
      }
      //const { Creatortoken, account } = await getCreatorContract();
      // const publicKey = await EthCrypto.publicKeyByPrivateKey(account.privateKey);
      // console.log('Public Key:', publicKey);


      const AddressArray = await Creatortoken.methods.getList().call();
      setaddressArray(AddressArray);
      //const MessageHash = await Creatortoken.methods.getMessageHash(plaintext).call();
      const MessageHash = await calculateSHA256(plaintext);
      
      
      const Owner = await Creatortoken.methods.owner().call();

      const sign = await web3.eth.personal.sign(MessageHash,Owner, "");

      console.log(await Creatortoken.methods.AssembleAddress().call());
      console.log(MessageHash);
      console.log(sign);

      await Creatortoken.methods.SendSignatureToVerifier(MessageHash, sign).send({from: account});

      let Fragments = secrets.str2hex(plaintext);

      let shares = await secrets.share(
        Fragments,
        Number(holdernum),
        Number(holderthre)
      );
   
      setShares(shares);

      let RandomArray = [...new Array(AddressArray.length)].map(
        (item, idx) => idx
      );
      let FragIndexArr = [...new Array(Number(holdernum))].map(
        (item, idx) => idx
      );
      const OwnerList = [];
      const ShareIndexList = [];
      for (let i = 0; i < Number(holderthre); i++) {
        const RandomNumber =
          RandomArray[Math.floor(Math.random() * RandomArray.length)];
        const RandomNumber2 =
          FragIndexArr[Math.floor(Math.random() * FragIndexArr.length)];
        OwnerList.push(RandomNumber);
        ShareIndexList.push(RandomNumber2);
        
        //await Creatortoken.methods.callSetX(AddressArray[RandomNumber], shares[RandomNumber2], lockTime).send({from:account});

        RandomArray = RandomArray.filter((value) => {
          return value != RandomNumber;
        });
        FragIndexArr = FragIndexArr.filter((value) => {
          return value != RandomNumber2;
        });
      }
      setownerlist(OwnerList);
      setShareList(ShareIndexList);
      //console.log(Number(holderthre), OwnerList);

      // setThreshold(Number(holderthre));
      // setOwnerList(OwnerList);

      //localStorage.setItem("OwnerList", JSON.stringify(OwnerList));
      //localStorage.setItem("holderthre", holderthre.toString());
      await Creatortoken.methods.GetValue(Number(holderthre), OwnerList).send({from:account});
      //console.log(OwnerList);
      

      setMessage(true);
      
      //console.log(AESLIST);

      
      
    // async function EncryptandSend(){
    //   for(let i=0; i<Number(holderthre); i++){
    //     let TempMessage = shares[i];
    //     //for(let j=0; j<Number(holderthre); j++){
    //     let EncryptedMessage = await encrypt(TempMessage, AESLIST);
    //     console.log(AESLIST,'接收的KEYLIST')
    //     console.log(EncryptedMessage,'加密后的数据');
    //     //}
    //     const hexMessage = "0x" + Buffer.from(EncryptedMessage).toString("hex");

    //     let NUM = await OwnerList[i];
    //     console.log(hexMessage,'hexMessage');

    //     await Creatortoken.methods.callSetX(AddressArray[NUM], hexMessage, lockTime).send({from:account});
    //   }
    // }
      // for(let i=0; i<Number(holderthre); i++){
      //   let TempMessage = shares[i];
      //   //for(let j=0; j<Number(holderthre); j++){
      //   let EncryptedMessage = await encrypt(TempMessage, AESLIST);
      //   console.log(AESLIST,'接收的KEYLIST')
      //   console.log(EncryptedMessage,'加密后的数据');
      //   //}
      //   const hexMessage = "0x" + Buffer.from(EncryptedMessage).toString("hex");

      //   let NUM = await OwnerList[i];
      //   console.log(hexMessage,'hexMessage');

      //   await Creatortoken.methods.callSetX(AddressArray[NUM], hexMessage, lockTime).send({from:account});
      // }

    
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



  useEffect(() => {
    

      if(isMessageProcessing.length>0){
        //isMessageProcessing是keyList 把keylist状态更新为AESLIST
        setAESLIST(isMessageProcessing);
        //吧从get里面获得AESKeyList的状态还原 以便下次使用
        setIsMessageProcessing([]);  
      }

  },[isMessageProcessing]);

  useEffect( ()=>{
    (async() =>{
    for(let i=0; i<Number(holderthre); i++){
      let RandomShare = ShareList[i];
      let TempMessage = Shares[RandomShare];
      //console.log(TempMessage,'shares')
      //for(let j=0; j<Number(holderthre); j++){
      let EncryptedMessage = await encrypt(TempMessage, AESLIST);
      //console.log(AESLIST,'接收的KEYLIST')
      //console.log(EncryptedMessage,'加密后的数据');
      //}
      const hexMessage = "0x" + Buffer.from(EncryptedMessage).toString("hex");

      let NUM = await ownerList[i];
      //console.log(hexMessage,'hexMessage');

      await Creatortoken.methods.callSetX(addressArray[NUM], hexMessage, lockTime).send({from:account});
    }
    })();
  },[AESLIST])


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
            <div>Delayed release time(Second)</div>
            <input
              type="text"
              value={lockTime}
              onChange={(e) => {
                setLockTime(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Assemble Threshold</div>
            <input
              type="text"
              value={holderthre}
              onChange={(e) => {
                setHolderthre(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Security(Split number)</div>
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
