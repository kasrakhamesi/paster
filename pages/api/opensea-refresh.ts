// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { globals } from "@/config/globals";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = globals.contracts.collectionAddress;
  const identifier = req.query.tokenId;
  if (!identifier)
    return res.status(400).json({ data: null, error: "tokenId is mandatory" });
  let response = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://api.opensea.io/v2/chain/ethereum/contract/${address}/nfts/${identifier}/refresh`,
    headers: {
      "X-API-KEY": globals.env.openseaAPIKey,
    },
  };

  axios
    .request(response)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return res.status(200).json({ data: response.data, error: null });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ data: null, error: error });
    });
}
