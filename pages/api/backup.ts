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
  const address = globals.contracts.collectionAddress;
  const chain = EvmChain.ETHEREUM;

  const wallet = req.query.wallet;
  if (!wallet)
    return res
      .status(400)
      .json({ data: null, error: "No wallet address provided" });

  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain,
      address: wallet.toString(),
      tokenAddresses: [address],
      format: "decimal",
      limit: 10,
      mediaItems: true,
      normalizeMetadata: true,
    });

    if (response.result.length === 0)
      return res.status(200).json({ data: [], error: null });

    // a reference to all nfts owned by the wallet
    const ownedNFTs = response.result;

    // a reference to the ids of all nfts owned by the wallet that have been revealed
    const revealedNftIds = ownedNFTs
      ?.filter((nft) => nft.metadata)
      .map((nft) => nft.tokenId);

    return res.status(200).json({ data: response.toJSON(), error: null });
  } catch (error) {
    console.error("Error getting backup tokens", error);
    return res.status(400).json({ data: null, error: error });
  }
}
