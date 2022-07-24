const KIP7Mock = artifacts.require('KIP7Mock');

const KSP_MAINNET = '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654';
const KSP_CONTRACT = '0xeff2bf4df47259333a5935AFD89e49Ff6865c1C1';
// console.log(MyContract);
module.exports = async function (deployer) {
  const KSP = await new KIP7Mock(KSP_MAINNET, 1);
};
