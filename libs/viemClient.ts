import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";


export const client = createPublicClient({
    chain: mainnet,
    transport: http(),
    key: 'public',
    name: 'Public Client',
    // pollingInterval: 10_000,
})