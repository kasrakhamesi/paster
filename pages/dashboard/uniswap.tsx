import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import PageHeader from "@/components/ui/dashboard/PageHeader";
import { SwapWidget, darkTheme, lightTheme } from "@uniswap/widgets";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Web3Provider } from "@ethersproject/providers";
import { useAccount } from "wagmi";
import "@uniswap/widgets/fonts.css";

interface CustomWindow extends Window {
  Browser: {
    T: () => void;
  };
}

function Uniswap() {
  const title = "Uniswap";
  const sub = "Uniswap";
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    (window as unknown as CustomWindow).Browser = {
      T: () => {},
    };
  }, [open]);

  const [provider, setProvider] = useState<Web3Provider | undefined>();
  const { connector } = useAccount();
  useEffect(() => {
    if (!connector) {
      return () => setProvider(undefined);
    }

    connector.getProvider().then((provider) => {
      setProvider(new Web3Provider(provider));
    });
  }, [connector]);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full min-h-full p-2 py-8 space-y-4 lg:p-4">
        <PageHeader title={title} sub={sub} />
        <div className="flex-1 flex flex-row items-center justify-center">
          <div className="uniswap">
            <SwapWidget
              theme={theme === "dark" ? darkTheme : lightTheme}
              provider={provider}
            />
          </div>
        </div>
      </div>
      <style>{`
        .uniswap [color="container"] > div > div:nth-child(3) {
          position: relative;
        }
      `}</style>
    </DashboardLayout>
  );
}

export default Uniswap;
