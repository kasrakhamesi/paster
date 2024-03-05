import { globals } from "@/config/globals";
import { MoralisNextApi } from "@moralisweb3/next";

export default MoralisNextApi({ apiKey: globals.env.moralisAPIKey });