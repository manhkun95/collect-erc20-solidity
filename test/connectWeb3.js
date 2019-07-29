const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

const { abi: factoryABI, networks: factoryNetworks } = require('../build/contracts/Factory.json')
const { abi: usdtABI, networks: usdtNetworks } = require('../build/contracts/USDTTestToken.json')

const factoryContractAddress = factoryNetworks['1564044641696'].address;
const factoryInstance = new web3.eth.Contract(factoryABI, factoryContractAddress)

const usdtContractAddress = usdtNetworks['1564044641696'].address;
const usdtInstance = new web3.eth.Contract(usdtABI, usdtContractAddress)

const owner = {
    privateKey: '0xf1354a6bcb1f4b4d3f17f608cab15ccaaeab3159af8b4ffb6f4bd279d9048177'
}

const account = web3.eth.accounts.privateKeyToAccount(owner.privateKey)
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

async function createReceivers(num) {
    const result = await factoryInstance
        .methods
        .createReceivers(num).send({
            from: web3.eth.defaultAccount,
            to: factoryContractAddress,
            gas: 4712388,
            gasPrice: 100000000000
        })
    return result
}

function getPastEvents() {
    return factoryInstance.getPastEvents('NewReceiver', {
        fromBlock: 0,
        toBlock: 'latest'
    }, (error, events) => {
        if (!error) {
            console.log(events)
        }
        else {
            console.log(error)
        }
    });
}

async function sendCoin(to, amount) {
    const result = await usdtInstance.methods.transfer(to, amount).send({
        from: web3.eth.defaultAccount,
        to: usdtContractAddress,
        gas: 4712388,
        gasPrice: 100000000000
    })
    return result.events.Transfer
}

async function sendFundsFromReceiverTo(sender, receiver, amount) {
    const result = await factoryInstance.methods.sendFundsFromReceiverTo(usdtContractAddress, sender, amount, receiver).send({
        from: web3.eth.defaultAccount,
        to: factoryContractAddress,
        gas: 4712388,
        gasPrice: 100000000000
    })
    return result
}

async function balanceOf(address) {
    const usdtBalance = await usdtInstance.methods.balanceOf(address).call()
    const ethBalance = await web3.eth.getBalance(address)
    return {
        usdtBalance,
        ethBalance
    }
}

createReceivers(1).then(console.log)

// sendCoin('0x4DC389c7E2c1ebb946A34edb4354CeF7a6128755', 1000).then(console.log)

// sendFundsFromReceiverTo('0x4DC389c7E2c1ebb946A34edb4354CeF7a6128755', '0x8Cc5A1a0802DB41DB826C2FcB72423744338DcB0', 2000).then(console.log)

// balanceOf('0xBdaa066305bEf4C9c10962Af779e2DffBCc1c845').then(console.log)

// web3.eth.sendTransaction({from: web3.eth.defaultAccount, to:'0x3590aca93338b0721966a8d0c96ebf2c4c87c544', value: 1000, gas:21000}).then(console.log)