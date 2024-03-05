import { LoaderIcon } from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { CountUp } from "use-count-up";

type Props = {
  title: string;
  value: number | undefined;
  loading: boolean;
};

const InfoPartItem = ({ title, value, loading }: Props) => {
  return (
    <div
      className="relative z-10 w-full h-20 overflow-hidden rounded-2xl"
      suppressHydrationWarning={true}
    >
      <div className="w-full h-full bg-neutral  rounded-2xl z-[1] p-6 flex items-center justify-center   absolute top-0 left-0">
        <div className="flex flex-col items-center justify-center">
          <h3 className="md:text-[32px] font-GilroyBlack text-3xl tracking-wider text-[#f0d867]">
            {loading ? (
              <div className="pb-4">
                <LoaderIcon />
              </div>
            ) : (
              <CountUp
                isCounting
                end={value}
                thousandsSeparator=","
                duration={2.2}
              />
            )}
          </h3>
          <p className="text-[16px] text-[#E0E0E0] ">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPartItem;
