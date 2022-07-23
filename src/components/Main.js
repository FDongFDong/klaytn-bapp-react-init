import React, { Component, useState } from 'react';
import axios from 'axios';
import WalletInfo from './WalletInfo';
import Nav from './Nav';

import caver from '../klaytn/caver';

import '../App.css';

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
