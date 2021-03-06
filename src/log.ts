import * as _ from 'lodash';
import * as fs from 'async-file';
import * as moment from 'moment';
import * as stringify from 'csv-stringify';

// 300 AI Generated Nude Portrait #7 tokens start at TokenId=191
function frameToTokenId(frameNumber) {
  return 190 + frameNumber;
}

function frameUrl(frameNumber) {
  return "https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-" + frameNumber.toString() + "-" + (frameToTokenId(frameNumber)).toString();
}

function toETH(amount) {
  return (amount / 1000000000000000000).toFixed(3);
}

async function log() {
  var results = []
  for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
    const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
    var data = { logs: [] };
    if (fs.exists(filename)) {
      data = JSON.parse(Buffer.from(await fs.readFile(filename)).toString());
    }

    for(const log of _.reverse(data.logs)) {
      var dt = moment.unix(parseInt(log.timeStamp, 16));
      if (log.method == 'acceptBid' || log.method == 'buy') {
        var amount = toETH(parseInt(log.data));
        results.push([ frameIndex, "sale", amount, dt ]);
      } else if (log.method == 'setSalePrice') {
        var amount = toETH(log.amount);
        results.push([ frameIndex, "list", amount, dt ]);
      } else if (log.method == 'addNewToken') {
        results.push([ frameIndex, "mint", null, dt ]);
      } else if (log.method == 'bid' && amount) {
        results.push([ frameIndex, "bid", amount, dt ]);
      }
    }
  }

  results = _.sortBy(results, (row) => row[3]);
  _.each(results, (result) => result[3] = result[3].format('YYYY/MM/DD HH:mm'));
  return results;
}

async function main() {
  try {
    var results = await log();
    stringify(results, { delimiter: '\t' }, async (error: Error, output: string): Promise<void> => {
        if (error) { throw error }
        await fs.writeFile("data/log.csv", output);
    });
    console.log("Wrote " + results.length + " entries to data/log.csv.");
} catch(error) {
    console.log(error)
  }
}

main();