import { ThemeContext } from "@/context/ThemeContext";
import { Clock, Cup, Gift, WalletMoney } from "iconsax-react";
import { useContext, useState } from "react";
import { LoaderIcon } from "react-hot-toast";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface RewardListProps {
  rewards: RewardItem[];
  onClaimReward: (rewardId: number) => Promise<any>;
}

export default function RewardList({
  rewards,
  onClaimReward,
}: RewardListProps) {
  const { theme } = useContext(ThemeContext);

  const [submittingRewardIds, setSubmittingRewardIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-6">
      {rewards.map((reward) => {
        let minTimestamp = 0;
        let maxTimestamp = 0;
        let timestampsDuration = 0;
        let progress = 1;

        if (reward.stepsTimestamps) {
          minTimestamp = Math.min(...reward.stepsTimestamps);
          maxTimestamp = Math.max(...reward.stepsTimestamps);
          timestampsDuration = maxTimestamp - minTimestamp;
          progress =
            ((reward.currentTimestamp || minTimestamp) - minTimestamp) /
            timestampsDuration;
        }

        return (
          <div
            className="flex flex-col md:flex-row gap-x-6 gap-y-4 items-center px-6 py-6 bg-base-300 rounded-3xl"
            key={reward.id}
          >
            <img
              src={reward.image}
              className="flex w-32 h-32 md:w-40 md:h-40 rounded-[36px]"
            />
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-col md:flex-row flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex flex-row items-center gap-x-6">
                  <div className="text-lg font-semibold">{reward.name}</div>
                  <div>#{reward.id}</div>
                </div>
                <div className="flex flex-row gap-1 text-xs font-medium">
                  <Clock size={16} color="#54597c" />
                  {reward.duration}
                </div>
                <div className="flex flex-row gap-1 text-xs font-medium">
                  <Gift size={16} color="#54597c" />
                  {reward.type}
                </div>
                <div className="flex flex-row gap-1 text-xs font-medium">
                  <WalletMoney size={16} color="#54597c" />
                  <div className="flex flex-row gap-1">
                    <span>Total Value: {reward.totalValue}</span>
                    <span className="">|</span>
                    <span>You Received: {reward.receivedValue}</span>
                  </div>
                </div>
              </div>
              {reward.stepsTimestamps && (
                <div className="w-full h-10 px-2 box-border">
                  <div className="relative z-0">
                    <div className="absolute z-0 top-[5px] left-0 right-0 w-full h-1.5 rounded bg-[#54597C]">
                      <div
                        className={[
                          "h-full rounded",
                          theme === "dark" ? "bg-CustomGreen" : "bg-[#29A027]",
                        ].join(" ")}
                        style={{
                          width: `${progress * 100}%`,
                        }}
                      />
                    </div>
                    {reward.stepsTimestamps.map((stepsTimestamp, index) => {
                      const date = new Date(stepsTimestamp);
                      const isFirst = index === 0;
                      const isLast =
                        index === reward.stepsTimestamps!.length - 1;
                      const isCrossed =
                        reward.currentTimestamp !== null &&
                        stepsTimestamp <= reward.currentTimestamp;
                      const stepProgress =
                        (stepsTimestamp - minTimestamp) / timestampsDuration;

                      return (
                        <div
                          className={[
                            "absolute z-1 top-0 -translate-x-2 w-4 h-4 rounded-lg box-border",
                            isCrossed
                              ? theme === "dark"
                                ? "bg-CustomGreen"
                                : "bg-[#29A027]"
                              : "border border-solid " +
                                (theme === "dark"
                                  ? "border-CustomGreen"
                                  : "border-[#29A027]"),
                          ].join(" ")}
                          style={{
                            left: `${stepProgress * 100}%`,
                          }}
                        >
                          <div
                            className={`absolute z-0 top-full mt-2 whitespace-nowrap text-xs ${
                              isLast
                                ? "right-0"
                                : isFirst
                                ? "left-0"
                                : "left-[50%] translate-x-[-50%]"
                            }`}
                            key={index}
                          >
                            {date.getDate()} {months[date.getMonth()]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {reward.isClaimable && (
                <button
                  disabled={submittingRewardIds.includes(reward.id)}
                  onClick={() => {
                    setSubmittingRewardIds((submittingRewardIds) => [
                      ...submittingRewardIds,
                      reward.id,
                    ]);
                    onClaimReward(reward.id).finally(() => {
                      setSubmittingRewardIds((submittingRewardIds) =>
                        submittingRewardIds.filter((item) => item !== reward.id)
                      );
                    });
                  }}
                  className="w-full btn btn-accent duration-300 shadow-xl bg-CustomGreen border-CustomGreen hover:border-CustomGreen hover:bg-CustomGreen/90 text-CustomBlack text-lg font-semibold shadow-CustomGreen/20 hover:shadow-lg disabled:shadow-none"
                >
                  {!submittingRewardIds.includes(reward.id) ? (
                    <>
                      <Cup size={24} variant="Bold" />
                      Claim Reward
                    </>
                  ) : (
                    <LoaderIcon />
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
