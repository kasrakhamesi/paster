import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { globals } from "@/config/globals";
import ABI from "@/contracts/collectionABI.json";

const useWithdraw = (tokenId: any, value: any) => {
  const [status, setStatus] = useState("");
  const callWithdraw = useContractWrite({
    // mode: 'recklesslyUnprepared',
    address: globals.contracts.collectionAddress,
    abi: ABI,
    functionName: "WithdrawNFTBackup",
    args: [tokenId, value],
    onSuccess: () => {
      setStatus("pending");
      toast.success("Waiting for confirmation");
    },
    onError: () => {
      setStatus("");
      toast.error("Withdraw failed");
    },
    onMutate: () => {
      setStatus("sending");
    },
  });
  const { isLoading: txIsLoading } = useWaitForTransaction({
    hash: callWithdraw.data?.hash,
    onSuccess: () => {
      setStatus("");
      setTimeout(() => {
        // queryClient.resetQueries(['nftMetadata', tokenId])
      }, 200);
      toast.success("Withdraw successful");
    },
    onError: () => {
      setStatus("");
      toast.error("Confirmation failed");
    },
  });

  return {
    callWithdraw,
    isLoading: callWithdraw.isLoading || txIsLoading,
    status,
  };
};

export default useWithdraw;
