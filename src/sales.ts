import * as _ from 'lodash';
import * as fs from 'async-file';
import * as moment from 'moment';

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

async function sales() {
  var results = []
  for(var frameIndex = 1; frameIndex <= 300; frameIndex++) {
    const filename = 'data/ai-generated-nude-portraits-7/' + frameIndex + '.json';
    var data = { logs: [] };
    if (fs.exists(filename)) {
      data = JSON.parse(Buffer.from(await fs.readFile(filename)).toString());
    }

    var first = true;
    for(const log of _.reverse(data.logs)) {
      var dt = moment.unix(parseInt(log.timeStamp, 16));
      if (log.method == 'acceptBid' || log.method == 'buy') {
        var amount = toETH(parseInt(log.data));
        if (first) {
          results.push("frame " + frameIndex + " sold for " + amount + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
          first = false;
        } else {
          results.push("  sold for " + amount + " ETH on " + dt.toString());
        }
      } else if (log.method == 'setSalePrice') {
        if (first) {
          var amount = toETH(log.amount);
          results.push("frame " + frameIndex + " was listed for sale for " + amount + " ETH on " + dt.toString() + " | " + frameUrl(frameIndex));
          first = false;
        }
      }
    }
  }
  return results;
}

async function updateREADME(results) {
  var data = await fs.readFile('README.md', 'utf8');
  var result = data.replace(/```\nnpm run sales\n[\s\S.]*```/m, '```\nnpm run sales\n\n' + results.join("\n") + "\n```");
  await fs.writeFile('README.md', result, 'utf8');
}

async function main() {
  try {
    var results = await sales();

    await updateREADME(results);

    _.each(results, (result) => {
      console.log(result)
    });
  } catch(error) {
    console.log(error)
  }
}

main();