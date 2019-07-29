pragma solidity >=0.4.25 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract USDTTestToken is ERC20, ERC20Detailed {
    /**
    * @dev Constructor that gives msg.sender all of existing tokens.
    */
  constructor() public ERC20Detailed('USDTTestToken', 'UTT', 18) {
      _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
  }
}