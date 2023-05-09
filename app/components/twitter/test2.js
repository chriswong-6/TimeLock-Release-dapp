const crypto = require('crypto');
const { promisify } = require('util');

const generateKeyPair = promisify(crypto.generateKeyPair);

async function generateRSAKeyPair() {
  const { publicKey, privateKey } = await generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  return { publicKey, privateKey };
}

const keydic = {};

(async function () {
  for (let i = 0; i < Number(holderthre); i++) {
    const keyPair = await generateRSAKeyPair();
    keydic[`PublicKey${i}`] = keyPair.publicKey;
    keydic[`PrivateKey${i}`] = keyPair.privateKey;
  }
  console.log(keydic['PublicKey0']);
})();
