import { cancelableRequest, request } from "@/api/request";

export function getWithdrawals(page: number) {
  return cancelableRequest(async (signal) => {
    const { count, rows } = await request<
      undefined,
      { count: number; rows: Withdrawal[] }
    >({
      method: "GET",
      url: "/withdrawals",
      needAuth: true,
      signal,
      params: {
        limit: 10,
        offset: (page - 1) * 10,
      },
    });

    return { totalCount: count, withdrawals: rows };
  });
}

export function createWithdrawals(data: { amount: number }) {
  return request<typeof data, { message: string }>({
    method: "POST",
    url: "/withdrawals",
    needAuth: true,
    data,
  });
}
