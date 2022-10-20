import "./App.css";
import { useState, useEffect } from "react";
import { connect } from "get-starknet";
import { Contract } from "starknet";
import { toBN } from "starknet/dist/utils/number";

import contractAbi from "./contract_abi.json";

const contractAddress =
  "0x04c2241e9d73926d20f2b3418d9da6717b4a7d304aae23d3a2d9539ede0d8f3e";

function App() {
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [index, setIndex] = useState("");
  const [transaction, setTransaction] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [discount, setDiscount] = useState("");

  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      // connect the wallet
      const starknet = await connect();
      await starknet?.enable({ starknetVersion: "v4" });
      // set up the provider
      setProvider(starknet.account);
      // set wallet address
      setAddress(starknet.selectedAddress);
      // set connection flag
      setIsConnected(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const submitSale = async () => {
    try {
      // create a contract object based on the provider, address and abi
      const contract = new Contract(contractAbi, contractAddress, provider);

      console.log(contract);

      // call the increase_balance function
      const response = await contract.submit_sale(
        price,
        index,
        discount,
        buyer,
        seller,
        transaction
      );
      alert(response === 1 ? "success" : "fail");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
          <h1 className="title">Minimal Starknet JS DEMO</h1>
          {isConnected ? (
            <button className="connect">
              {address.slice(0, 5)}...{address.slice(60)}
            </button>
          ) : (
            <button className="connect" onClick={() => connectWallet()}>
              Connect wallet
            </button>
          )}

          <p className="description">
            Using Starknet JS with a simple contract
          </p>

          <div className="grid">
            <div href="#" className="card">
              {/* <p>Insert a wallet address, to retrieve its name.</p> */}

              <input
                type="input"
                className="input"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="input"
                className="input"
                placeholder="Item Index"
                onChange={(e) => {
                  setIndex(e.target.value);
                }}
              />
              <input
                type="input"
                className="input"
                placeholder="Discount Applied"
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              />
              <input
                type="input"
                className="input"
                placeholder="Buyer Name"
                onChange={(e) => {
                  setBuyer(e.target.value);
                }}
              />
              <input
                type="input"
                className="input"
                placeholder="Seller Name"
                onChange={(e) => {
                  setSeller(e.target.value);
                }}
              />
              <input
                type="input"
                className="input"
                placeholder="Transaction Id"
                onChange={(e) => {
                  setTransaction(e.target.value);
                }}
              />
              <div className="cardForm">
                <input
                  type="submit"
                  className="button"
                  value="Get Balance "
                  onClick={() => submitSale()}
                />
              </div>
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
