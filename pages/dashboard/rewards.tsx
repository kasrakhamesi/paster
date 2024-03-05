import { useRef, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import DataLoader from "@/components/ui/dashboard/DataLoader";
import PageHeader from "../../components/ui/dashboard/PageHeader";
import RewardBanner from "@/components/ui/dashboard/RewardBanner";
import NoRewards from "@/components/ui/dashboard/NoRewards";
import ClaimNote from "@/components/ui/dashboard/ClaimNote";
import SwapNote from "@/components/ui/dashboard/SwapNote";
import RewardList from "@/components/ui/dashboard/RewardList";
import { claimReward, getRewards } from "@/api/rewards";

export default function Rewards() {
  const title = "Rewards";
  const sub = "Claim your reward";

  const [data, setData] = useState<{
    totalRewards: number;
    inValueOfToken: number;
    rewards: RewardItem[];
  }>({
    totalRewards: 0,
    inValueOfToken: 0,
    rewards: [],
  });

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <DashboardLayout>
      <DataLoader
        load={() => getRewards()}
        setData={setData}
        reloadRef={reloadRef}
      >
        {!data.rewards.length ? (
          <NoRewards />
        ) : (
          <div className="flex flex-col w-full h-full p-2 py-8 space-y-6 lg:p-4">
            <PageHeader title={title} sub={sub} />
            <RewardBanner
              totalRewards={data.totalRewards}
              valueInToken={data.inValueOfToken}
            />
            {data.rewards.find((reward) => reward.isClaimable) !== null && (
              <>
                <ClaimNote />
                <SwapNote />
              </>
            )}
            <RewardList
              rewards={data.rewards}
              onClaimReward={(rewardId) =>
                claimReward({ tokenId: rewardId })
                  .then(({ message }) => {
                    toast.success(message);
                    if (reloadRef.current) reloadRef.current();
                  })
                  .catch(({ message }) => toast.error(message))
              }
            />
          </div>
        )}
      </DataLoader>
    </DashboardLayout>
  );
}
