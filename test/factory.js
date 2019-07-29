const Factory = artifacts.require("Factory");

contract('Factory', (accounts) => {
  it('should put 10000 MetaCoin in the first account', async () => {
    const factoryInstance = await Factory.deployed();
    const receivers = await factoryInstance.createReceivers(2)
    console.log(receivers.logs[0])
  });
});
