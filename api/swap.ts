import { cancelableRequest, request } from "@/api/request";

export function getOffchainTokenBalance() {
  return cancelableRequest((signal) =>
    request<undefined, { availableBalance: number }>({
      method: "GET",
      url: "/swap/offchain-token/balance",
      needAuth: true,
      signal,
    })
  );
}

export function estimateInternalPairs(data: { amountIn: number }) {
  return cancelableRequest((signal) =>
    request<typeof data, { amountOut: number }>({
      method: "POST",
      url: "/swap/estimate/internal-pairs",
      needAuth: true,
      signal,
      data,
    })
  );
}
