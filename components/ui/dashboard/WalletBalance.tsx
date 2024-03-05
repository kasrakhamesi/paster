import { getOffchainTokenBalance } from "@/api/swap";
import { useDataLoader } from "@/hooks/useDataLoader";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useBalance } from "wagmi";

type Props = {
  address: `0x${string}` | undefined;
};

const WalletBalance = ({ address }: Props) => {
  const {
    data: balance,
    isLoading: loadingBalance,
    error: errorBalance,
    refetch: refetchBalance,
  } = useBalance({
    address: address,
  });

  const [offchainTokenBalance, setOffchainTokenBalance] = useState({
    availableBalance: 0,
  });
  const offchainTokenBalanceLoaderState = useDataLoader({
    load: () => getOffchainTokenBalance(),
    setData: setOffchainTokenBalance,
  });

  return (
    <div className="relative z-0 w-full px-6 py-6 overflow-hidden h-64 md:h-72 rounded-3xl bg-base-300">
      <div className="">
        <h1 className="text-2xl tracking-wide font-GilroyBold ">
          Wallet Balance:
        </h1>
        <div className="flex items-center justify-start my-3 space-x-2 text-3xl">
          {loadingBalance ? (
            <span className="loading loading-spinner w-9 text-asterfiBlue" />
          ) : errorBalance !== null ? (
            <button className="btn btn-sm" onClick={() => refetchBalance()}>
              Retry
            </button>
          ) : (
            <>
              <h2 className="text-2xl text-asterfiBlue">
                <NumericFormat
                  value={balance?.formatted}
                  thousandSeparator
                  displayType={"text"}
                  decimalScale={8}
                />
              </h2>
              <h5 className=" font-GilroyThin">ETH</h5>
            </>
          )}
        </div>
        <h1 className="text-2xl tracking-wide font-GilroyBold ">
          Credit Balance:
        </h1>
        <div className="flex items-center justify-start my-3 space-x-2 text-3xl">
          {offchainTokenBalanceLoaderState.isLoading ? (
            <span className="loading loading-spinner w-9 text-asterfiBlue" />
          ) : offchainTokenBalanceLoaderState.isError ? (
            <button
              className="btn btn-sm"
              onClick={() => offchainTokenBalanceLoaderState.reload()}
            >
              Retry
            </button>
          ) : (
            <>
              <h2 className="text-2xl text-asterfiBlue">
                <NumericFormat
                  value={offchainTokenBalance.availableBalance}
                  thousandSeparator
                  displayType={"text"}
                  decimalScale={8}
                />
              </h2>
              <h5 className=" font-GilroyThin">CREDIT</h5>
            </>
          )}
        </div>
      </div>
      <img
        src="/images/transactions-bg.png"
        alt="img"
        className="object-contain object-top h-full w-auto absolute -z-10 scale-90 -right-32 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default WalletBalance;
