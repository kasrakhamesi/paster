import ScrollToTop from "@/utils/ScrollMeToTop";
import { ReactNode } from "react";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  SIWEConfig,
  SIWEProvider,
  getDefaultConfig,
} from "connectkit";
import { SiweMessage } from "siwe";
import { globals } from "@/config/globals";
import { getNonce, getSession, login, logout } from "@/api/auth";
import { NotLoggedInError } from "@/api/request";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    // alchemyId: globals.env.alchemyAPIKey, // or infuraId
    infuraId: globals.env.infuraID, // or alchemyId
    walletConnectProjectId: globals.env.walletConnectProjectId,

    // Required
    appName: globals.appInfo.name,

    // Optional
    appDescription: globals.appInfo.description,
    appUrl: globals.appInfo.url, // your app's url
    appIcon: globals.appInfo.logo, // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

const siweConfig: SIWEConfig = {
  createMessage: ({ nonce, address }) =>
    new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId: 1,
      nonce,
    }).prepareMessage(),
  getNonce: async () => {
    try {
      return (await getNonce()).nonce;
    } catch (error) {
      throw (error as Error).message;
    }
  },
  getSession: async () => {
    try {
      return await getSession();
    } catch (error) {
      if (error instanceof NotLoggedInError) return null;
      throw (error as Error).message;
    }
  },
  verifyMessage: async ({ message, signature }) => {
    try {
      await login({ message, signature });

      return true;
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      await logout();

      return true;
    } catch (error) {
      if (error instanceof NotLoggedInError) return false;
      throw (error as Error).message;
    }
  },
};

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <SIWEProvider {...siweConfig}>
        <ConnectKitProvider>
          <ScrollToTop />
          {children}
        </ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};

export default RootProvider;
