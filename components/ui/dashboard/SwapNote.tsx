import { useContext } from "react";
import { Crown } from "iconsax-react";
import { ThemeContext } from "@/context/ThemeContext";

export default function SwapNote() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        "flex flex-row items-start gap-1 px-3 md:px-5 py-3 rounded-3xl",
        theme === "dark"
          ? "bg-blue-500/20 text-blue-500 fill-blue-500"
          : "bg-blue-600/20 text-blue-600 fill-blue-600",
      ].join(" ")}
    >
      <div className="text-sm sm:text-base md:text-lg font-semibold">
        To unlock your rewards, you must first claim your reward credits. Once
        claimed, head over to the ‘swap’ section to convert them into valuable
        reward tokens. After your swap request is submitted, our admin team will
        promptly send them your way. You can easily keep track of your request
        status in the ‘withdrawals’ section.
      </div>
    </div>
  );
}
