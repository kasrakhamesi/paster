// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import { openseaSDK } from "@/libs/osClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenSeaAsset } from "opensea-js/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = globals.contracts.collectionAddress;
  const tokenId = req.query.tokenId;
  if (!tokenId)
    return res.status(400).json({ data: null, error: "tokenId is mandatory" });

  try {
    const asset: OpenSeaAsset = await openseaSDK.api.getAsset({
      tokenAddress: address,
      tokenId: tokenId.toString(),
    });

    return res.status(200).json({ data: asset, error: null });
  } catch (error) {
    console.error("Error getting backup tokens", error);
    return res.status(400).json({ data: null, error: error });
  }
}
