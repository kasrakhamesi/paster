import InfoPartItem from "./InfoPartItem";

type Props = {
  totalTransactions: number | undefined;
  totalMintedNFTs: number | undefined;
  loadingTransactions?: boolean;
  loadingMintedNFTs?: boolean;
};

function LiveStats({
  totalTransactions,
  loadingTransactions = false,
  totalMintedNFTs,
  loadingMintedNFTs = false,
}: Props) {
  return (
    <div className="w-full pt-10 mb-32" id="transactions">
      <h1 className="my-2 text-3xl lg:text-4xl font-GilroyBlack ">
        Live Stats
      </h1>
      <div className="grid w-full gap-6 my-6 md:grid-cols-2 ">
        <InfoPartItem
          title="Number Of Transactions"
          value={totalTransactions}
          loading={loadingTransactions}
        />
        <InfoPartItem
          title="Minted NFTs"
          value={totalMintedNFTs}
          loading={loadingMintedNFTs}
        />
      </div>
    </div>
  );
}

export default LiveStats;
