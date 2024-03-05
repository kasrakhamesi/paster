import { useContext, useRef, useState } from "react";
import { ArrowDown2, ArrowSwapHorizontal } from "iconsax-react";
import toast, { LoaderIcon } from "react-hot-toast";
import { ThemeContext } from "@/context/ThemeContext";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import PageHeader from "@/components/ui/dashboard/PageHeader";
import DataLoader from "@/components/ui/dashboard/DataLoader";
import NoSwap from "@/components/ui/dashboard/NoSwap";
import { createWithdrawals } from "@/api/withdrawals";
import { estimateInternalPairs, getOffchainTokenBalance } from "@/api/swap";
import { globals } from "@/config/globals";

export default function Swap() {
  const title = "Swap";
  const sub = "Swap your assets";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useContext(ThemeContext);

  const [amountIn, setAmountIn] = useState("");
  const amountInFloat = parseFloat(amountIn);

  const [data, setData] = useState<{ availableBalance: number }>({
    availableBalance: 0,
  });

  const isFormValid = ![
    !isNaN(amountInFloat),
    amountInFloat > 0,
    amountInFloat <= data.availableBalance,
  ].includes(false);

  const [estimatedAmountOut, setEstimateAmountOut] = useState<null | number>(0);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <DashboardLayout>
      {!globals.swap.enabled ? (
        <NoSwap />
      ) : (
        <div className="flex flex-col w-full min-h-full p-2 py-8 space-y-4 lg:p-4">
          <PageHeader title={title} sub={sub} />
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className="border border-solid border-[#54597c] rounded-3xl w-full flex flex-col max-w-md px-8 py-10 gap-7">
              <DataLoader
                load={() => getOffchainTokenBalance()}
                setData={setData}
                reloadRef={reloadRef}
              >
                <div>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-xl text-[#54597c] font-medium mb-2.5">
                        You Send
                      </div>
                      <input
                        className="w-full border-0 bg-transparent p-0 h-10 text-2xl font-semibold outline-none"
                        type="number"
                        value={amountIn}
                        onChange={(event) => setAmountIn(event.target.value)}
                        placeholder="0.00"
                      />
                      <div className="text-base text-[#54597c] mt-1.5">
                        Available: {data.availableBalance}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button className="h-12 w-32 bg-base-300 rounded-3xl p-3 flex flex-row gap-1.5 items-center">
                        <img
                          src="/images/dashboard/ApeCoin.png"
                          alt="CREDIT"
                          className="w-7 h-7 rounded-full flex"
                        />
                        <div className="flex-1">CREDIT</div>
                        <ArrowDown2 size={20} />
                      </button>
                      <button
                        className={[
                          "h-12 w-32 btn btn-outline text-lg font-semibold rounded-3xl",
                          theme === "dark"
                            ? "border-CustomGreen bg-transparent text-CustomGreen hover:border-CustomGreen hover:bg-CustomGreen"
                            : "border-[#29A027] bg-transparent text-[#29A027] hover:border-[#29A027] hover:bg-[#29A027]",
                        ].join(" ")}
                        onClick={() =>
                          setAmountIn(data.availableBalance.toString())
                        }
                      >
                        Max
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex-1 border-b border-solid border-[#54597c]"></div>
                  <button
                    className="w-10 h-10 p-0 bg-transparent cursor-pofloater box-border border border-solid border-[#54597c] rounded-full flex items-center justify-center"
                    disabled
                  >
                    <ArrowSwapHorizontal size={20} />
                  </button>
                  <div className="flex-1 border-b border-solid border-[#54597c]"></div>
                </div>
                <div>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-xl text-[#54597c] font-medium mb-2.5">
                        You Recive
                      </div>
                      <DataLoader
                        load={() => {
                          if (!isFormValid)
                            return {
                              promise: Promise.resolve(null),
                            } as CancelableRequest<null>;

                          const estimateRequest = estimateInternalPairs({
                            amountIn: amountInFloat,
                          });

                          return {
                            promise: estimateRequest.promise.then(
                              (data) => data?.amountOut
                            ),
                            abortController: estimateRequest.abortController,
                          } as CancelableRequest<number>;
                        }}
                        deps={[amountIn]}
                        setData={setEstimateAmountOut}
                        errorSize="buttonOnly"
                      >
                        {estimatedAmountOut === null ? (
                          <div>Please enter sent amount.</div>
                        ) : (
                          <input
                            className="w-full border-0 bg-transparent p-0 h-10 text-2xl font-semibold outline-none"
                            type="number"
                            value={estimatedAmountOut}
                            placeholder="0.00"
                            readOnly
                          />
                        )}
                      </DataLoader>
                    </div>
                    <button className="h-12 w-32 bg-base-300 rounded-3xl p-3 flex flex-row gap-1.5 items-center">
                      <img
                        src="/images/dashboard/ApeCoin.png"
                        alt="APE"
                        className="w-7 h-7 rounded-full flex"
                      />
                      <div className="flex-1">SIPHER</div>
                      <ArrowDown2 size={20} />
                    </button>
                  </div>
                </div>
                {amountInFloat > data.availableBalance && (
                  <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Insufficient inventory.</span>
                  </div>
                )}
                <button
                  disabled={isSubmitting || !isFormValid}
                  onClick={() => {
                    setIsSubmitting(true);
                    createWithdrawals({ amount: amountInFloat })
                      .then(({ message }) => {
                        toast.success(message);
                        setAmountIn("");
                        if (reloadRef.current) reloadRef.current();
                      })
                      .catch(({ message }) => toast.error(message))
                      .finally(() => setIsSubmitting(false));
                  }}
                  className="w-full btn btn-accent duration-300 shadow-xl bg-CustomGreen border-CustomGreen hover:border-CustomGreen hover:bg-CustomGreen/90 text-CustomBlack text-lg font-semibold shadow-CustomGreen/20 hover:shadow-lg disabled:shadow-none"
                >
                  {!isSubmitting ? (
                    <>
                      <ArrowSwapHorizontal size={24} variant="Bold" />
                      Swap
                    </>
                  ) : (
                    <LoaderIcon />
                  )}
                </button>
              </DataLoader>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
