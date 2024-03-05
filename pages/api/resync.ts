// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: globals.env.moralisAPIKey,
    });
  }
  const chain = EvmChain.ETHEREUM;

  const tokenId = req.query.tokenId;
  const collection = globals.contracts.collectionAddress;
  if (!tokenId)
    return res.status(400).json({ data: null, error: "No token Id provided" });

  try {
    const response = await Moralis.EvmApi.nft.reSyncMetadata({
      flag: "uri",
      mode: "sync",
      address: collection,
      tokenId: tokenId.toString(),
      chain,
    });

    return res.status(200).json({ data: response.result, error: null });
  } catch (error) {
    console.error("Error getting backup tokens", error);
    return res.status(400).json({ data: null, error: error });
  }
}
