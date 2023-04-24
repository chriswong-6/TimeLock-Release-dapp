var Call = artifacts.require("Call");
var Other0 = artifacts.require("Other");
var Other1 = artifacts.require("Other");
var Other2 = artifacts.require("Other");
var Other3 = artifacts.require("Other");
var Other4 = artifacts.require("Other");
var Other5 = artifacts.require("Other");
var Other6 = artifacts.require("Other");
var Other7 = artifacts.require("Other");
var Assemble = artifacts.require("Assemble");
//const secrets = require('secret-sharing.js');
//let res;

module.exports = async (deployer,network, accounts) => {
  //const call_account = accounts[0];
  //const rece_account0 = accounts[1];
  //const rece_account1 = accounts[2];
  //const rece_account2 = accounts[3];
  //const rece_account3 = accounts[4];

  await deployer.deploy(Call, { from: accounts[0] });
  const call = await Call.deployed();
  const callAddress = call.address;

  await deployer.deploy(Other0, { from: accounts[1] });
  const other0 = await Other0.deployed();

  await deployer.deploy(Other1, { from: accounts[2] });
  const other1 = await Other1.deployed();

  await deployer.deploy(Other2, { from: accounts[3] });
  const other2 = await Other2.deployed();

  await deployer.deploy(Other3, { from: accounts[4] });
  const other3 = await Other3.deployed();

  await deployer.deploy(Other4, { from: accounts[5] });
  const other4 = await Other4.deployed();

  await deployer.deploy(Other5, { from: accounts[6] });
  const other5 = await Other5.deployed();

  await deployer.deploy(Other6, { from: accounts[7] });
  const other6 = await Other6.deployed();

  await deployer.deploy(Other7, { from: accounts[8] });
  const other7 = await Other7.deployed();

  await deployer.deploy(Assemble, { from: accounts[9] });
  const assemble = await Assemble.deployed();
  
  await other0.SendAddress(callAddress);
  await other1.SendAddress(callAddress);
  await other2.SendAddress(callAddress);
  await other3.SendAddress(callAddress);
  await other4.SendAddress(callAddress);
  await other5.SendAddress(callAddress);
  await other6.SendAddress(callAddress);
  await other7.SendAddress(callAddress);
  await assemble.SendAddress(callAddress);

}