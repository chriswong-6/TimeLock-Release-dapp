import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createClient, useConnect, WagmiConfig } from "wagmi";
import { goerli, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
declare var secrets: any;
declare var window: any;
const { chains, provider, webSocketProvider } = configureChains(
  [localhost, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
const Content = ({ Component, pageProps }: any) => {
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [localhost, goerli],
    }),
  });
  useEffect(() => {
    try {
      connect();
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Content Component={Component} pageProps={pageProps}></Content>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
