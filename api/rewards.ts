import { cancelableRequest, request } from "@/api/request";

export function getRewards() {
  return cancelableRequest((signal) => {
    return request<
      undefined,
      {
        totalRewards: number;
        inValueOfToken: number;
        rewards: RewardItem[];
      }
    >({
      method: "GET",
      url: "/rewards",
      needAuth: true,
      signal,
    });
  });
}

export function claimReward(data: { tokenId: number }) {
  return request<
    typeof data,
    {
      message: string;
    }
  >({
    method: "POST",
    url: "/rewards/claim",
    needAuth: true,
    data,
  });
}
