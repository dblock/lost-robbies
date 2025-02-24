import * as _ from 'lodash';
import * as EtherscanApi from 'etherscan-api';
import * as InputDataDecoder from 'ethereum-input-data-decoder';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
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
  const inputDataDecoder = new InputDataDecoder(await getAbi());
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
        url: frameUrl(frameIndex),
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
    var data = { logs: [] };
    if (fs.existsSync(filename)) {
      data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
    }
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
async function listActiveTransactions() {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(300, 0);
  for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
    bar.update(frameIndex);
      await new Promise(r => setTimeout(r, 200));
      const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
      var data = { logs: [] };
      if (fs.existsSync(filename)) {
        data = JSON.parse(Buffer.from(await fs.readFileSync(filename)).toString());
      }
      var latestBlock = null;
      if (data.logs.length > 0) {
        latestBlock = parseInt(data.logs[data.logs.length - 1].blockNumber, 16) + 1;
      }

      var topic = '0x' + frameToTokenId(frameIndex).toString(16).padStart(64, '0');

      var logs = [];

      try {
        logs = logs.concat((await api.log.getLogs(
          superrareContractAddress, // address
            latestBlock, // fromBlock
            null, // toBlock
            null, // topic0
            null, // topic0_1_opr
            null, // topic1
            null, // topic1_2_opr
            null, // topic2
            null, // topic2_3_opr
            topic, // topic3, tokenId '0x0000000000000000000000000000000000000000000000000000000000000126'
            null
        )).result);
      } catch (error) {
        if (error !== 'No records found') {
          throw(error);
        }
      }
  
      try {
        logs = logs.concat((await api.log.getLogs(
          superrareContractAddress, // address
            latestBlock, // fromBlock
            null, // toBlock
            null, // topic0
            null, // topic0_1_opr
            topic // topic1, tokenId
        )).result);
      } catch (error) {
        if (error !== 'No records found') {
          throw(error);
        }
      }

      var inputDataDecoder = new InputDataDecoder(await getAbi());  
      var updated = false;
      for(var log of logs) {
        if (! _.find(data.logs, (v) => { return v.transactionHash === log.transactionHash })) {
          var tx = (await api.proxy.eth_getTransactionByHash(log.transactionHash)).result;
          const decodedInputData = inputDataDecoder.decodeData(tx.input);
          const method = decodedInputData.method;

          if (method == 'setSalePrice' || method == 'bid') {
            log = { 
              ...log, 
              amount: parseInt(log.topics[2], 16)
            }
          }

          data.logs.push({
            ...log,
            tx: tx,
            method: method
          });
          updated = true;
          await new Promise(r => setTimeout(r, 200));
        }
      }

      if (updated) {
        data.logs = _.sortBy(data.logs, (log) => { return parseInt(log.timeStamp, 16) })
        await fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      }
  }
  bar.stop();
}

async function main() {
  try
  {
    await init();
    await listCreateTransactions();
    await listTransferTransactions();
    await listActiveTransactions();
  } catch(error) {
    console.log(error)
  }
}

main();