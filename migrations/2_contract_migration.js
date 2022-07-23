const MyContract = artifacts.require('MyContract');
const KIP7Mock = artifacts.require('KIP7Mock');
const Dex = artifacts.require('Dex');

const KSP_MAINNET = '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654';
const KSP_CONTRACT = '0xeff2bf4df47259333a5935AFD89e49Ff6865c1C1';
// console.log(MyContract);
module.exports = async function (deployer, accounts) {
  // let temp = await KIP7Mock(KSP_MAINNET);
  let temp = deployer.deploy(KIP7Mock, 'KlaySwap', 'KSP').then((result) => {
    console.log(result);
  });
  await deployer.deploy(Dex, {
    from: accounts[0],
    value: '1000000000000000000',
  });
  const dex = await Dex.deployed();
  // const KSP = await KIP7Mock.at(KSP_MAINNET);
  // deployer.deploy(KIP7Mock(KIP7Mock.address, 'a'));
};
