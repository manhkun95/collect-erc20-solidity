pragma solidity >=0.4.25 <0.6.0;
import "./Receiver.sol";

contract Factory {
	address public owner;
	mapping (uint256 => address) receivers;
	uint256 receiverCount;

	constructor() public {
		owner = msg.sender;
		receiverCount = 1;
	}

	function createReceivers(uint8 number) public {
		require(msg.sender == owner, "Caller must be owner");
        for(uint8 i = 0; i < number; i++) {
			receivers[receiverCount++] = address(new Receiver());
        }
	}

	function getReceiver(uint256 id) public returns (address) {
		return receivers[id];
	}

	function getCurrentId(uint256 id) public returns (address) {
		return receivers[id];
	}


	function sendFundsFromReceiverTo( address tracker, address senderContractAddress, uint256 amount, address receiver ) public returns (bool) {
       	require(msg.sender == owner, "Caller must be owner");
        return Receiver(senderContractAddress).sendFundsTo(tracker, amount, receiver);
    }

	function batchCollect( address tracker, address receiver, address[] memory contractAddresses, uint256[] memory amounts ) public {
		require(msg.sender == owner, "Caller must be owner");

		for(uint256 i = 0; i < contractAddresses.length; i++) {

			// add exception handling
			Receiver(contractAddresses[i]).sendFundsTo(tracker, amounts[i], receiver);
		}
    }

}
