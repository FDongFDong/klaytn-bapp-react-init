import React, { Component, useState } from 'react';
import axios from 'axios';
import WalletInfo from './WalletInfo';
import Nav from './Nav';
import caver from '../klaytn/caver';
import '../App.css';
const CONTRACT = require('../abis/MyContract.json');
const rpcURL = 'https://api.baobab.klaytn.net:8651/';
const networkID = '1001';
const deployedNetworkAddress = CONTRACT.networks[networkID].address; // contract 주소가 배포시 매번 바뀌기 때문에 자주 사용하기 위해 변수에 저장
const contracts = new caver.klay.Contract(CONTRACT.abi, deployedNetworkAddress); // Contract object 생성

function Main(props) {
  const [txType, setTxType] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState(null);

  //Kaikas Connect
  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        klaytn.on('accountsChanged', () => setAccountInfo(klaytn));
      } catch (error) {
        console.log('User denied account access');
      }
    } else {
      console.log(
        'Non-Kaikas browser detected. You should consider trying Kaikas!'
      );
    }
  };

  const setAccountInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    const account = klaytn.selectedAddress;
    const balance = await caver.klay.getBalance(account);
    console.log(balance);
    let ret = await contracts.methods.get_myval().call();
    console.log(ret);

    await contracts.methods.set_myval(1).send({
      // send 함수는 비용이 들어가기 때문에 비용을 지불할 사람이 필요하다. 가스는 최대 허용량, 무한루프를 탈출하기 위함
      from: account,
      gas: '2000000',
    });
    ret = await contracts.methods.get_myval().call();
    console.log(ret);

    setAccount(account);
    setBalance(caver.utils.fromPeb(balance, 'KLAY'));
  };

  return (
    <div>
      <header>
        <Nav />
      </header>
      <section>
        <div className="container">
          <div>
            <button onClick={loadAccountInfo}>Connect Wallet</button>
            <WalletInfo address={account} balance={balance} />
            hello world!
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
