// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: globals.env.moralisAPIKey,
    });
  }

  const tokenAddress = req.query.address;
  if (!tokenAddress)
    return res
      .status(400)
      .json({ data: null, error: "No token address provided" });

  try {
    const response = await Moralis.EvmApi.token.getTokenMetadata({
      addresses: [tokenAddress.toString()],
    });

    return res.status(200).json({ data: response.result, error: null });
  } catch (error) {
    console.error("Error getting backup tokens", error);
    return res.status(400).json({ data: null, error: error });
  }
}
