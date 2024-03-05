// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: globals.env.moralisAPIKey,
      });
    }

    const response = await Moralis.EvmApi.nft.getNFTCollectionStats({
      chain: "0x1",
      address: globals.contracts.collectionAddress,
    });

    const totalTransactions = Number(response.raw.transfers.total);
    const totalSupply = Number(response.raw.total_tokens);

    const newStats = {
      stats: {
        total_supply: totalSupply,
        total_transactions: totalTransactions,
      },
    };

    return res.status(200).json({ data: newStats, error: null });
  } catch (error) {
    console.error("Error getting opensea stats", error);
    return res.status(500).json({ data: null, error: error });
  }
}
