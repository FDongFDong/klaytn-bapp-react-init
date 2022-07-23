pragma solidity 0.5.6;

import "../v2-periphery/contracts/UniswapV2Router02.sol";
import "../v2-core/contracts/interfaces/IUniswapV2Factory.sol";
// import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";

contract Dex {
    string public name = "Dex";
    address internal constant UNISWAP_V2_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public uniswapRouter;
    address internal constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    constructor() public payable {
        uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
    }
}