import { useContext } from "react";
import { Crown } from "iconsax-react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ClaimNote() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        "flex flex-row items-start gap-1 px-3 md:px-5 py-3 rounded-3xl",
        theme === "dark"
          ? "bg-CustomGreen/20 text-CustomGreen fill-CustomGreen"
          : "bg-[#29A027]/20 text-[#29A027] fill-[#29A027]",
      ].join(" ")}
    >
      <Crown
        size={24}
        variant="Bold"
        className="w-5 h-5 min-w-[20px] md:w-6 md:h-6 md:min-w-[24px]"
      />
      <div className="text-sm sm:text-base md:text-lg font-semibold">
        Congratulations! Your Staking Rewards are Ready to Claim
      </div>
    </div>
  );
}
