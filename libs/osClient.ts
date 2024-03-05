import { OpenSeaSDK, Chain } from "opensea-js";
import { ethersProvider } from "./ethers";
import { globals } from "@/config/globals";


export const openseaSDK = new OpenSeaSDK(ethersProvider, {
  chain: Chain.Mainnet,
  apiKey: globals.env.openseaAPIKey,
});