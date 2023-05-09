
for(let i=0; i<3; i++){
    let TempMessage = 1;
    //let FirstEncrypt = await encryptMessage(keydic['PublicKey0'], TempMessage);
    for(let j=0; j<3; j++){
      TempMessage = TempMessage +1
      console.log(TempMessage,'第n层加密');
    }
  }