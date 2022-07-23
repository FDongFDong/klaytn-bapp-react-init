import Caver from 'caver-js';

const caver = new Caver(window.klaytn);
// 지갑 만들기
// const acc = caver.klay.accounts.create(); // create("문구") 문구를 넣으면 엔트로피를 넣는게 됨
// console.log('addr:', acc.address);
// console.log('private key: ', acc.privateKey);
export default caver;
