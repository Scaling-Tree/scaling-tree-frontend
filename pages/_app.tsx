import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Polybase } from "@polybase/client";
import {
  createClient as createGraphClient,
  Provider as GraphPovider,
} from "urql";
import { graphExchange } from "@graphprotocol/client-urql";
import * as GraphClient from "../.graphclient";
import { config } from "@/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { chains, provider } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "ScalingTree",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const graphClient = createGraphClient({
  url: config.graphUrl,
  exchanges: [graphExchange(GraphClient)],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ToastContainer />
        <GraphPovider value={graphClient}>
          <Component {...pageProps} />
        </GraphPovider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
