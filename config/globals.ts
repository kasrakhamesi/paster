// Desc: Global variables for the project
enum activeEvmChain {
  ETHEREUM = "0x1",
  POLYGON = "0x89",
}

interface IGlobals {
  appInfo: {
    version: string;
    name: string;
    logo: string;
    description: string;
    url: string;
  };
  env: {
    moralisActiveChain: string;
    walletConnectProjectId: string;
    alchemyURI: string;
    alchemyAPIKey: string;
    infuraID: string;
    openseaURI: string;
    openseaAPIKey: string;
    openseaAsterfiPage: string;
    moralisAPIKey: string;
    etherscanAddressBaseURL: string;
    etherscanTrxBaseURL: string;
    etherscanAPIKey: string;
    asterfiApiUrl: string;
  };
  swap: {
    enabled: boolean;
  };
  metadata: {
    title: string;
    description: string;
  };
  contracts: {
    collectionAddress: `0x${string}`;
    stakingAddress: `0x${string}`;
  };
}

export const globals: IGlobals = {
  appInfo: {
    version: "0.0.1",
    name: "Asterfi",
    logo: "https://app.asterfi.com/images/transaction-bg.png",
    description:
      "Take control of your Asterfis and make decisions regarding its utilization, growth, and progression.",
    url: "https://app.asterfi.com/",
  },
  env: {
    moralisActiveChain: "0x1",
    infuraID: "534ed1da68914c408d602302d6ff2d4a",
    walletConnectProjectId: "c3ab4043524e32ae56bbebd3240467db",
    alchemyURI: "https://eth-mainnet.g.alchemy.com/v2/",
    alchemyAPIKey: "N8yHDjQE6d_qSwFfnJ19OeuwFxWpRr3Z",
    openseaURI: "https://api.opensea.io/api/v1/collection/asterfi/",
    openseaAPIKey: "de3136c1050b4e8ba2b061cb88a9fb05",
    openseaAsterfiPage: "https://opensea.io/collection/asterfi",
    moralisAPIKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjAxY2M3MmQ2LWYxYmMtNDk1Yi04N2FiLWZlZDE3Y2U5OTFkYyIsIm9yZ0lkIjoiMjk2NjQ3IiwidXNlcklkIjoiMzAzNzUyIiwidHlwZUlkIjoiMTdlNzc3OGMtMmQyNS00ZTliLWE4ZGItMGE2MGM2MzYxYjhjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTY2NzAyOTgsImV4cCI6NDg1MjQzMDI5OH0.2PY6lgKjzQ0KXtYTDosy5DvZkfQIcAAYtibypikBuGU",
    etherscanAddressBaseURL: "https://etherscan.io/address/",
    etherscanTrxBaseURL: "https://etherscan.io/tx/",
    etherscanAPIKey: "G5SG9XWHI32JG7SGCWZRG9HSS8ES2ZJAJB",
    asterfiApiUrl: "https://asterfi-backend.vercel.app/",
  },
  swap: {
    enabled: false,
  },
  metadata: {
    title: "AsterFi - Dashboard",
    description:
      "ASTERFI is a unique NFT collection that combines the value of cryptocurrency investments with the collectability of NFTs. With a limited edition of 2000 NFTs, ASTERFI is the first project of its kind to offer a cash flow stream for each NFT in the collection",
  },
  contracts: {
    collectionAddress: "0x0193B85c38337EB90338Ed8660810ba66c548b62",
    stakingAddress: "0xa8a53f7cabe8e033fced23529db0b4ac63cad9f5",
  },
};
