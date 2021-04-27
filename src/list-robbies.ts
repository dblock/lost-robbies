import * as _ from 'lodash';
import * as EtherscanApi from 'etherscan-api';
import * as InputDataDecoder from 'ethereum-input-data-decoder';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import axios from 'axios';
import * as cliProgress from 'cli-progress';

var api = null;
var superrareContractAddress = '0x41a322b28d0ff354040e2cbc676f0320d8c8850d'; // contract

async function getAbi() {
  const filename = 'data/contract.json';
  if (fs.existsSync(filename)) {
    var data = Buffer.from(await fs.readFileSync(filename));
    return JSON.parse(data.toString());
  } else {
    var abi = JSON.parse((await api.contract.getabi(superrareContractAddress)).result);
    console.log("Retrieved " + abi.length + " contract bytes.");
    await fs.writeFileSync(filename, JSON.stringify(abi, null, 2));
    return abi;
  }
}

async function init() {
  dotenv.config();
  var etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  if (! etherscanApiKey) { throw new Error('Missing ETHERSCAN_API_KEY') }
  api = EtherscanApi.init(etherscanApiKey);
}

// 300 AI Generated Nude Portrait #7 tokens start at TokenId=191
function frameToTokenId(frameNumber) {
  return 190 + frameNumber;
}

function tokenIdToFrame(tokenId) {
  return tokenId - 190;
}

function frameUrl(frameNumber) {
  return "https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-" + frameNumber.toString() + "-" + (frameToTokenId(frameNumber)).toString();
}

// initial create events
async function listCreateTransactions() {
  const createLogs = (await api.log.getLogs(
    superrareContractAddress, // address
    '5977236', // fromBlock, from https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-1-191
    '5977931', // toBlock, from https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-300-490
    null,
    null,
    '0x0000000000000000000000000000000000000000000000000000000000000000' // creation
  )).result;        
  var inputDataDecoder = new InputDataDecoder(await getAbi());
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(createLogs.length, 0);
  for(let frameIndex = 1; frameIndex <= createLogs.length; frameIndex++) {
    bar.update(frameIndex);
    const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
    if (! fs.existsSync(filename)) {
    var log = createLogs[frameIndex - 1];
      var tx = (await api.proxy.eth_getTransactionByHash(log.transactionHash)).result;
      const decodedInputData = inputDataDecoder.decodeData(tx.input);
      const method = decodedInputData.method;
      const data = {
        frame: frameIndex,
        metadata: ((await axios.get(decodedInputData.inputs[0])).data),
        logs: [{
          ...log,
          tx: tx,
          method: method,
        }]
      };
      await fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      await new Promise(r => setTimeout(r, 100));
    }
  }
  bar.stop();
}

// initial transfer events
async function listTransferTransactions() {
  var transferLogs = (await api.log.getLogs(
    superrareContractAddress, // address
    '5977931', // fromBlock, from https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-1-191
    '5979502', // toBlock, from https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-300-490
    null,
    null,
    '0x000000000000000000000000860c4604fe1125ea43f81e613e7afb2aa49546aa' // videodrome's address
  )).result;
  var inputDataDecoder = new InputDataDecoder(await getAbi());  
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(transferLogs.length, 0);
  var i = 0;
  for(var log of transferLogs) {
    bar.update(i += 1, 0);
    const tokenId = parseInt(log.data, 16);
    const frameIndex = tokenIdToFrame(tokenId);
    const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
    var data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
    if (! _.find(data.logs, (v) => { return v.transactionHash === log.transactionHash && v.topics[0] === log.topics[0] })) {
      var tx = (await api.proxy.eth_getTransactionByHash(log.transactionHash)).result;
      const decodedInputData = inputDataDecoder.decodeData(tx.input);
      const method = decodedInputData.method;
      data.logs.push({
        ...log,
        tx: tx,
        method: method
      });
      await fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      await new Promise(r => setTimeout(r, 100));
    }
  }
  bar.stop();
}

// remaining transactions
async function listRemainingTransactions(frameIndex) {
  try {
    await new Promise(r => setTimeout(r, 100));
    var topic = '0x' + frameToTokenId(frameIndex).toString(16).padStart(64, '0');
    var logs = (await api.log.getLogs(
      superrareContractAddress, // address
        null, // fromBlock
        null, // toBlock
        null, // topic0
        null, // topic0_1_opr
        null, // topic1
        null, // topic1_2_opr
        null, // topic2
        null, // topic2_3_opr
        topic, // '0x0000000000000000000000000000000000000000000000000000000000000126', // topic3
        null
    )).result;
    var inputDataDecoder = new InputDataDecoder(await getAbi());  
    for(var log of logs) {
      const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
      var data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
      if (! _.find(data.logs, (v) => { return v.transactionHash === log.transactionHash })) {
        var tx = (await api.proxy.eth_getTransactionByHash(log.transactionHash)).result;
        const decodedInputData = inputDataDecoder.decodeData(tx.input);
        const method = decodedInputData.method;
        data.logs.push({
          ...log,
          tx: tx,
          method: method
        });
        await fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        await new Promise(r => setTimeout(r, 100));
      }
    }
  } catch (error) {
    if (error !== 'No records found') {
      throw(error);
    }
    return [];
  }
}

async function main() {
  try
  {
    await init();

    await listCreateTransactions();
    await listTransferTransactions();

    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar.start(300, 0);
    for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
      bar.update(frameIndex - 1);
      await listRemainingTransactions(frameIndex);
    }
    bar.stop();

    for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
      const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
      var data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());

      var sales = _.filter(data.logs, (log) => {
        return log.method == 'acceptBid' || log.method == 'buy'
      })
  
      for(let i = 0; i < sales.length; i++) {
        const sale = sales[sales.length - i - 1];
        var dt = moment.unix(parseInt(sale.timeStamp, 16));
        var amount = (parseInt(sale.data) / 1000000000000000000);
        if (i == 0) {
          console.log("frame " + frameIndex + " sold for " + amount.toFixed(3) + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
        } else {
          console.log("  sold for " + amount.toFixed(3) + " ETH on " + dt.toString());
        }
      }
    }

  } catch(error) {
    console.log(error)
  }
}

main();