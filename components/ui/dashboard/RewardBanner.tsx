import { LoaderIcon } from "react-hot-toast";

interface RewardBannerProps {
  totalRewards: number;
  valueInToken: number;
}

export default function RewardBanner({
  totalRewards,
  valueInToken,
}: RewardBannerProps) {
  return (
    <div className="flex items-center px-2 lg:px-8 h-20 md:h-28 bg-base-300 rounded-3xl">
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-4 space-y-0.5 md:space-y-2">
        <h3 className="hidden md:flex text-xl text-CustomGrayDarker">
          Total Rewards
        </h3>
        <h3 className="flex md:hidden text-lg text-CustomGrayDarker">Total</h3>
        {totalRewards !== null ? (
          <h4 className="text-xl md:text-2xl font-thin text-base-content">
            <span className="text-base md:text-lg text-CustomGrayDarker">
              CREDIT:
            </span>{" "}
            {totalRewards}
          </h4>
        ) : (
          <LoaderIcon />
        )}
      </div>
      <div className="w-0.5 h-10 md:h-14 rounded bg-base-100" />
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-4 space-y-0.5 md:space-y-2">
        <h3 className="hidden md:flex text-xl text-CustomGrayDarker">
          In value of token
        </h3>
        <h3 className="flex md:hidden text-lg text-CustomGrayDarker">
          In token
        </h3>
        {valueInToken !== null ? (
          <h4 className="text-xl md:text-2xl font-thin text-base-content">
            <span className="text-base md:text-lg text-CustomGrayDarker">
              CREDIT:
            </span>{" "}
            {valueInToken}
          </h4>
        ) : (
          <LoaderIcon />
        )}
      </div>
    </div>
  );
}
