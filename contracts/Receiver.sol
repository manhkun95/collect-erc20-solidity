pragma solidity >=0.4.25 <0.6.0;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Receiver{
	address public owner;

	constructor() public {
		owner = msg.sender;
	}

	function sendFundsTo(address tracker,uint amount, address receiver) public returns (bool)
	{
		require(msg.sender == owner, 'Sender must be owner');
		return ERC20(tracker).transfer(receiver, amount);
	}
}
