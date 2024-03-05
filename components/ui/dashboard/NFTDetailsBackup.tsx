import { globals } from "@/config/globals";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LoaderIcon, toast } from "react-hot-toast";
import { formatEther, formatUnits, parseUnits } from "viem";
import { useContractRead } from "wagmi";
import WithdrawModal from "./WithdrawModal";
import { MoneySend } from "iconsax-react";

type Props = {
  id: string | string[] | undefined;
  revealed: boolean | undefined;
  mayRefetch: boolean;
  setMayRefetch: Dispatch<SetStateAction<boolean>>;
};

const NFTDetailsBackup = ({
  id,
  revealed,
  mayRefetch,
  setMayRefetch,
}: Props) => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [realAmount, setRealAmount] = useState<bigint | undefined>(undefined);
  const [symbol, setSymbol] = useState<string | undefined>(undefined);
  const [decimal, setDecimal] = useState<number | undefined>(undefined);
  const [limit, setLimit] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  if (!revealed) return null;

  useEffect(() => {
    if (mayRefetch) {
      refetch();
      setMayRefetch(false);
    }
  }, [mayRefetch]);

  const { isLoading: loadingBackupToken, refetch } = useContractRead({
    address: globals.contracts.collectionAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "nftInfos",
        outputs: [
          {
            internalType: "bool",
            name: "revealed",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "tokenDecimal",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "backupLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "backupAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenBackup",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "nftInfos",
    args: [id?.toString()],
    enabled: !!id && !!revealed,
    onSuccess(data) {
      const address = ((data as any)?.[4] as string) || "";
      const amountData = ((data as any)?.[3] as bigint) || 0n;
      const decimalData = ((data as any)?.[1] as number) || 0;
      const limitData = ((data as any)?.[2] as bigint) || 0n;

      fetchTokenPrice(address);
      setAmount(formatUnits(amountData, decimalData));
      setDecimal(decimalData);
      setLimit(formatUnits(limitData, decimalData));
    },
  });

  async function fetchTokenPrice(address: string) {
    try {
      const response = await axios.get(`/api/token-price?address=${address}`);
      setPrice(response.data.data.usdPrice);
      setSymbol(response.data.data.tokenSymbol);
    } catch (error) {
      console.log(error);
    }
  }

  function handleModalSwitch() {
    setShowModal(!showModal);
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  // console.log("amount", amount)
  if (loadingBackupToken) return <LoaderIcon />;
  if (amount && Number(amount) <= 0) return <></>;
  if (amount && Number(amount) > 0)
    return (
      <>
        <div className="flex flex-row items-center space-x-2 space-y-0 md:space-y-1 md:justify-center md:flex-col md:items-end">
          <div
            className="w-full tooltip tooltip-warning"
            data-tip={
              price && amount
                ? `(${(price * Number(amount)).toFixed(2)}$)`
                : "0.00$"
            }
          >
            <div
              className="flex items-center"
              onClick={() => {
                navigator.clipboard.writeText(amount?.toString() || "0");
                toast.success("Copied to clipboard");
              }}
            >
              <h2 className="flex text-xl text-warning font-GilroyBlack ">
                {amount && Number(amount) > 1
                  ? `${Number(amount)?.toFixed(4)}`
                  : amount}
              </h2>
              <span className="font-sans text-xs font-normal text-warning">
                {symbol}
              </span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full text-sm btn btn-warning md:btn-sm"
            >
              <MoneySend />
              Withdraw
            </button>
          </div>
        </div>
        <WithdrawModal
          Modal={showModal}
          tokenId={id!.toString()}
          Switch={handleModalSwitch}
          balance={amount!}
          limit={limit!}
          symbol={symbol!}
          decimal={decimal!}
        />
      </>
    );
};

export default NFTDetailsBackup;
