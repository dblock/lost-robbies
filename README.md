## Where are the Robbies?

This code retrieves information about the 300 frames of Robbie Barrat's "AI Generated Nude Portrait #7" using the [Etherscan API](https://etherscan.io/apis). Some of these are known as "Lost Robbies". 

* [The Lost Robbies](https://editorial.superrare.co/2020/09/05/the-lost-robbies/)
* [Rare “Lost Robbie” AI Nude NFTs Worth Millions Surface](https://digitalartcollector.com/rare-lost-robbie-ai-nude-nfts-worth-millions-surface/)

A walk-through of this code is available in [this accompanying blog post](https://code.dblock.org/2021/04/27/walking-etherium-transaction-logs-to-find-lost-robbies-using-etherscan-api.html).

An freebie OBJKT NFT was also minted, inspired by this project. Available at [hicetnunc.xyz/objkt/53103](https://www.hicetnunc.xyz/objkt/53103).

### Run

#### Prerequisites

Install dependencies.

```
npm install
```

#### Update Data

To get fresh data, obtain an API key from [Etherscan](https://etherscan.io/myapikey) and save it to `.env`.

```
ETHERSCAN_API_KEY=...
```

Retrieve creation transactions, IPFS info and sales, and cache output to [data](data).

```
npm run update

 ████████████████████████████████████████ 100% | ETA: 0s | 300/300
 ████████████████████████████████████████ 100% | ETA: 0s | 600/600
 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 3% | ETA: 125s | 10/300

```

#### Sales Report

Produce a sales report, including history and what's for sale.

```
npm run sales

frame 7 sold for 200.000 ETH on Sat Sep 21 2024 18:04:47 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-7-197
frame 8 was listed for sale for 295.000 ETH on Fri Nov 08 2024 10:24:11 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-8-198
frame 13 was listed for sale for 150.000 ETH on Fri Dec 23 2022 21:21:59 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-13-203
  sold for 100.888 ETH on Sat Apr 10 2021 00:40:21 GMT-0400
frame 24 sold for 0.100 ETH on Fri Jul 20 2018 10:32:22 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-24-214
frame 44 was listed for sale for 225.000 ETH on Wed Aug 17 2022 15:19:46 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-44-234
  sold for 110.000 ETH on Mon Apr 19 2021 14:17:32 GMT-0400
frame 45 was listed for sale for 690.420 ETH on Tue Nov 01 2022 10:50:11 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-45-235
  sold for 100.888 ETH on Fri Apr 09 2021 15:38:00 GMT-0400
frame 53 sold for 299.000 ETH on Fri Jun 16 2023 20:15:23 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-53-243
frame 60 was listed for sale for 750.000 ETH on Wed Sep 01 2021 11:48:52 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-60-250
frame 65 was listed for sale for 545.000 ETH on Sun Apr 04 2021 22:14:41 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-65-255
  sold for 47.000 ETH on Sun Apr 04 2021 08:32:42 GMT-0400
frame 78 was listed for sale for 333.000 ETH on Sat Oct 16 2021 17:32:43 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-78-268
  sold for 140.000 ETH on Fri Aug 06 2021 18:45:35 GMT-0400
frame 86 was listed for sale for 7777.000 ETH on Sat Jul 10 2021 22:18:20 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-86-276
frame 92 was listed for sale for 888.000 ETH on Mon May 03 2021 02:16:57 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-92-282
  sold for 50.000 ETH on Mon Apr 05 2021 13:50:40 GMT-0400
frame 96 sold for 222.000 ETH on Mon Aug 30 2021 12:58:20 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-96-286
frame 101 was listed for sale for 5555.000 ETH on Fri Mar 12 2021 07:11:07 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-101-291
  sold for 1.500 ETH on Mon Dec 02 2019 13:46:32 GMT-0500
frame 104 was listed for sale for 3000.000 ETH on Sun Sep 19 2021 12:08:33 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-104-294
  sold for 19.000 ETH on Thu Jun 11 2020 16:28:09 GMT-0400
frame 110 sold for 260.000 ETH on Thu Mar 16 2023 13:53:23 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-110-300
frame 111 sold for 175.000 ETH on Mon Jul 03 2023 16:26:35 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-111-301
frame 119 sold for 111.000 ETH on Tue Mar 29 2022 10:48:40 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-119-309
frame 149 was listed for sale for 725.000 ETH on Wed Jun 21 2023 12:23:59 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-149-339
  sold for 35.000 ETH on Tue Aug 04 2020 02:06:33 GMT-0400
frame 153 sold for 16.500 ETH on Wed Jan 01 2020 15:37:56 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-153-343
frame 158 sold for 210.000 ETH on Mon Nov 11 2024 18:20:47 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-158-348
frame 163 was listed for sale for 175.000 ETH on Fri Sep 02 2022 13:37:46 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-163-353
  sold for 200.000 ETH on Sun Aug 08 2021 05:30:13 GMT-0400
frame 165 was listed for sale for 300.000 ETH on Sat Jun 01 2024 07:34:59 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-165-355
frame 166 sold for 150.000 ETH on Thu Jan 04 2024 18:08:59 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-166-356
  sold for 80.000 ETH on Sat Apr 03 2021 03:56:19 GMT-0400
frame 169 sold for 125.000 ETH on Wed Dec 07 2022 22:56:35 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-169-359
  sold for 150.000 ETH on Sat Aug 07 2021 22:48:43 GMT-0400
frame 170 was listed for sale for 2000.000 ETH on Sat Jul 31 2021 20:16:41 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-170-360
  sold for 72.500 ETH on Tue Jul 27 2021 11:58:30 GMT-0400
frame 175 sold for 0.001 ETH on Sat Jul 11 2020 23:54:29 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-175-365
  sold for 0.001 ETH on Sat Jul 11 2020 23:37:43 GMT-0400
  sold for 0.001 ETH on Sat Jul 11 2020 23:30:37 GMT-0400
  sold for 0.001 ETH on Sat Jul 11 2020 23:14:22 GMT-0400
  sold for 21.000 ETH on Mon Jun 29 2020 22:48:05 GMT-0400
  sold for 1.500 ETH on Sat Dec 21 2019 00:09:56 GMT-0500
frame 179 sold for 70.400 ETH on Tue May 04 2021 09:24:10 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-179-369
frame 184 sold for 300.000 ETH on Tue Oct 05 2021 12:23:29 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-184-374
frame 193 sold for 200.000 ETH on Thu Sep 02 2021 15:47:55 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-193-383
frame 204 was listed for sale for 1200.000 ETH on Tue Feb 20 2024 01:57:23 GMT-0500 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-204-394
frame 206 was listed for sale for 969.420 ETH on Fri Oct 01 2021 06:39:31 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-206-396
  sold for 60.000 ETH on Wed Apr 07 2021 15:40:30 GMT-0400
frame 262 sold for 210.000 ETH on Mon Aug 09 2021 05:38:38 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-262-452
frame 269 sold for 125.000 ETH on Mon Apr 05 2021 16:36:12 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-269-459
frame 275 was listed for sale for 885.000 ETH on Mon Apr 19 2021 22:25:38 GMT-0400 | https://superrare.co/artwork/ai-generated-nude-portrait-7-frame-275-465
  sold for 50.000 ETH on Wed Apr 07 2021 19:29:54 GMT-0400
```

### License

MIT
