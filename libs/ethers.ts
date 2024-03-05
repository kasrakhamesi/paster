import { globals } from "@/config/globals";
import { ethers } from "ethers";

// Use the mainnet
const network = "homestead";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
export const ethersProvider = new ethers.providers.JsonRpcProvider(
    globals.env.alchemyURI + globals.env.alchemyAPIKey,
)