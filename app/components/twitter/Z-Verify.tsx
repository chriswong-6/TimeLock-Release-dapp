import { FC, useEffect, useState,useContext } from "react";
import Web3 from "web3";
import AppContext from "../../hooks/SaveContext";
import s from "@/styles/Twitter.module.scss";
import { 
  getAssembleContract
} from "@/hooks/useContract";

declare var secrets: any;
declare var window: any;
const Verify = ({ open }: { open: boolean }) => {

  const {PlaintextString,setPlaintextString} = useContext(AppContext);
  const [result, setResult] = useState("");
  const [LocalPlaintext, setLocalPlaintext] = useState("");
  const [networkId, setNetworkId] = useState<number>();

  async function calculateSHA256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = "0x" +hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }


  var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const VerifyMessage = async () => {
    try {

      const { AssembleToken, account } = await getAssembleContract();
      const HashMessage = await AssembleToken.methods.HashMessage().call();
      const sign = await AssembleToken.methods.sign().call();
      //let res = await AssembleToken.methods.GetValue(Creatortoken.options.address).call();

      let verify_address = await web3.eth.personal.ecRecover(HashMessage,sign);
      

      const checksumAddress = web3.utils.toChecksumAddress(verify_address);
      //console.log(verify_address,'verify_address');

      //console.log(checksumAddress,'checksumAddress');
      // const messageHash = utils.hashMessage(Encryptmessage);
      // const signingKey = utils.recoverPublicKey(messageHash, sign);
      // const verify_address = utils.computeAddress(signingKey);
      //console.log(LocalPlaintext);
      const LocalHash = await calculateSHA256(LocalPlaintext);

      let verify_res;
      if ((checksumAddress == account)&&(LocalHash==HashMessage)){
        verify_res = "Correct";
      } else {
        verify_res = "Not_Correct";
      }
      setResult(verify_res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    web3.eth.net.getId().then((res) => {
      setNetworkId(Number(res));
    });
  }, []);

  useEffect( () =>{
    setLocalPlaintext(PlaintextString);

    //setPlaintextString("");

  }, [PlaintextString]);

  return (
    <div className={s.new_message}>
      <h2>Assemble</h2>
      <div className={s.rrow}>
        <div className={s.sender_button} onClick={VerifyMessage}>
          Verify
        </div>
      </div>
      <div className={s.title}>Verify Result</div>

      <div className={s.address}> {result}</div>
    </div>
  );
};

export default Verify;
