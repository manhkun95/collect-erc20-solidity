const USDTTestToken = artifacts.require("USDTTestToken");

module.exports = function(deployer) {
  deployer.deploy(USDTTestToken);
};
