import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CeloProvider, Alfajores, NetworkNames } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CeloProvider
      dapp
      connectModal={{
        // This options changes the title of the modal and can be either a string or a react element
        title: <span>Connect your Wallet</span>,
        providersOptions: {
          // This option toggles on and off the searchbar
          searchable: true,
        },
      }}
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
    >
      <App />
    </CeloProvider>
  </React.StrictMode>
);

reportWebVitals();
