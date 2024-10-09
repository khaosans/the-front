import { NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { kv } from '@vercel/kv'; // Import Vercel KV for data storage and retrieval

let data: any = {
    "total_usd_value": 27654.142997146177,
    "chain_list": [
      {
        "id": "eth",
        "community_id": 1,
        "name": "Ethereum",
        "native_token_id": "eth",
        "logo_url": "https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png",
        "wrapped_token_id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "usd_value": 11937.702345945296
      },
      {
        "id": "bsc",
        "community_id": 56,
        "name": "BSC",
        "native_token_id": "bsc",
        "logo_url": "https://static.debank.com/image/chain/logo_url/bsc/7c87af7b52853145f6aa790d893763f1.png",
        "wrapped_token_id": "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        "usd_value": 2279.5321187397594
      },
      {
        "id": "xdai",
        "community_id": 100,
        "name": "xDai",
        "native_token_id": "xdai",
        "logo_url": "https://static.debank.com/image/chain/logo_url/xdai/8b5320523b30bd57a388d1bcc775acd5.png",
        "wrapped_token_id": "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
        "usd_value": 305.39078328786195
      },
      {
        "id": "matic",
        "community_id": 137,
        "name": "Polygon",
        "native_token_id": "matic",
        "logo_url": "https://static.debank.com/image/chain/logo_url/matic/d3d807aff1a13e9ba51a14ff153d6807.png",
        "wrapped_token_id": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        "usd_value": 1241.1293776554253
      },
      {
        "id": "ftm",
        "community_id": 250,
        "name": "Fantom",
        "native_token_id": "ftm",
        "logo_url": "https://static.debank.com/image/chain/logo_url/ftm/700fca32e0ee6811686d72b99cc67713.png",
        "wrapped_token_id": "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        "usd_value": 388.4508412244692
      },
      {
        "id": "okt",
        "community_id": 66,
        "name": "OEC",
        "native_token_id": "okt",
        "logo_url": "https://static.debank.com/image/chain/logo_url/okt/1228cd92320b3d33769bd08eecfb5391.png",
        "wrapped_token_id": "0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15",
        "usd_value": 1051.8493580839101
      },
      {
        "id": "heco",
        "community_id": 128,
        "name": "HECO",
        "native_token_id": "heco",
        "logo_url": "https://static.debank.com/image/chain/logo_url/heco/db5152613c669e0cc8624d466d6c94ea.png",
        "wrapped_token_id": "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
        "usd_value": 85.54070337826396
      },
      {
        "id": "avax",
        "community_id": 43114,
        "name": "Avalanche",
        "native_token_id": "avax",
        "logo_url": "https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png",
        "wrapped_token_id": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        "usd_value": 3251.9556287016276
      },
      {
        "id": "op",
        "community_id": 10,
        "name": "Optimism",
        "native_token_id": "op",
        "logo_url": "https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png",
        "wrapped_token_id": "0x4200000000000000000000000000000000000006",
        "usd_value": 481.6603092427565
      },
      {
        "id": "arb",
        "community_id": 42161,
        "name": "Arbitrum",
        "native_token_id": "arb",
        "logo_url": "https://static.debank.com/image/chain/logo_url/arb/f6d1b236259654d531a1459b2bccaf64.png",
        "wrapped_token_id": "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        "usd_value": 3394.648029286528
      },
      {
        "id": "celo",
        "community_id": 42220,
        "name": "Celo",
        "native_token_id": "0x471ece3750da237f93b8e339c536989b8978a438",
        "logo_url": "https://static.debank.com/image/chain/logo_url/celo/41da5c1d3c0945ae822a1f85f02c76cf.png",
        "wrapped_token_id": "",
        "usd_value": 162.94112590980387
      },
      {
        "id": "movr",
        "community_id": 1285,
        "name": "Moonriver",
        "native_token_id": "movr",
        "logo_url": "https://static.debank.com/image/chain/logo_url/movr/4b0de5a711b437f187c0d0f15cc0398b.png",
        "wrapped_token_id": "0xe3c7487eb01c74b73b7184d198c7fbf46b34e5af",
        "usd_value": 996.3205434639602
      },
      {
        "id": "cro",
        "community_id": 25,
        "name": "Cronos",
        "native_token_id": "cro",
        "logo_url": "https://static.debank.com/image/chain/logo_url/cro/44f784a1f4c0ea7d26d00acabfdf0028.png",
        "wrapped_token_id": "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
        "usd_value": 67.64405055936568
      },
      {
        "id": "boba",
        "community_id": 288,
        "name": "Boba",
        "native_token_id": "boba",
        "logo_url": "https://static.debank.com/image/chain/logo_url/boba/e43d79cd8088ceb3ea3e4a240a75728f.png",
        "wrapped_token_id": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        "usd_value": 2009.3777816671507
      }
    ]
  }

export async function GET() {
    let response = NextResponse.json(data); 

    
    // return response;

    const debankData = await kv.get('debank-data');
    if (debankData) {
        logger.info(`Retrieved data from KV store for wallet ID: ${debankData}`);
        return NextResponse.json(debankData);
    }

    //get data from stubb debank
    const debankResponse = data;

    await kv.set('debank-data', debankResponse);
    return NextResponse.json(debankResponse);



  }
