interface CancelableRequest<DT> {
  promise: Promise<DT | undefined>;
  abortController: AbortController;
}

interface RewardItem {
  id: number;
  name: string;
  image: string;
  duration: string;
  type: string;
  totalValue: string;
  receivedValue: string;
  currentTimestamp: number | null;
  stepsTimestamps: number[] | null;
  isClaimable: boolean;
}

interface Withdrawal {
  id: number;
  amount: string;
  transactionId: string | null;
  status: "pending" | "approved" | "rejected";
  message: string | null;
}
