// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: globals.env.moralisAPIKey,
    });
  }
  const address = globals.contracts.collectionAddress;
  const chain = EvmChain.ETHEREUM;

  const cursor = req.query.cursor || "";

  try {
    const response = await Moralis.EvmApi.nft.getNFTContractTransfers({
      chain,
      address,
      cursor: cursor.toString(),
      format: "decimal",
      limit: 10,
    });

    const tokensId = [];
    const responseAsJson = response.toJSON();
    for (const transaction of responseAsJson.result) {
      tokensId.push(Number(transaction.token_id));
    }

    let data = null;

    try {
      data = await axios.get(
        `${globals.env.asterfiApiUrl}tokens/${tokensId.join(",")}`
      );
    } catch (err) {
      console.error(err);
    }

    const newResponse = {
      page: responseAsJson.page,
      page_size: responseAsJson.page_size,
      cursor: responseAsJson.cursor,
      total: responseAsJson.total,
      result: [] as any,
    };
    for (const transaction of responseAsJson.result) {
      const targetImageUrl = data?.data.data.find(
        (item: any) => item.tokenId === Number(transaction.token_id)
      );
      newResponse.result.push({
        ...transaction,
        image_url: targetImageUrl?.imageUrl || null,
      });
    }

    return res.status(200).json({ data: newResponse, error: null });
  } catch (error) {
    console.error("Error getting all NFT transfers", error);
    return res.status(400).json({ data: null, error: error });
  }
}
