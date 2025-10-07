/**
 * add-incentiv-network.js
 * Utility script to add or switch to the Incentiv Chain in MetaMask or any EIP-1193 wallet.
 */

(function () {
  const INCENTIV_PARAMS = {
    chainIdDecimal: 24101, // 0x5e25
    chainName: "Incentiv",
    nativeCurrency: {
      name: "CENT",
      symbol: "CENT",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.incentiv.io"],
    blockExplorerUrls: ["https://explorer.incentiv.io"],
  };

  async function addOrSwitchNetwork(params) {
    if (!window.ethereum) {
      alert("Wallet Not Supported. Please install MetaMask or a compatible wallet.");
      return;
    }

    const chainIdHex = "0x" + Number(params.chainIdDecimal).toString(16); // 0x5e25

    try {
      // Try switching first (if already added)
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
      console.info("Switched to Incentiv Network");
    } catch (switchErr) {
      if (switchErr && switchErr.code === 4902) {
        // Not added → add the chain
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainIdHex,
                chainName: params.chainName,
                nativeCurrency: params.nativeCurrency,
                rpcUrls: params.rpcUrls,
                blockExplorerUrls: params.blockExplorerUrls,
              },
            ],
          });
          console.info("Incentiv Network added to MetaMask");
        } catch (addErr) {
          if (addErr?.code === 4001) {
            console.warn("User rejected the chain addition");
          } else {
            console.error("Failed to add Incentiv Network:", addErr);
            alert("Could not add the Incentiv network. See console for details.");
          }
        }
      } else if (switchErr?.code === 4001) {
        console.warn("User rejected the network switch");
      } else {
        console.error("Failed to switch chain:", switchErr);
        alert("Could not switch to the Incentiv network. See console for details.");
      }
    }
  }

  // Expose globally so it can be called anywhere
  window.addIncentivNetwork = function () {
    addOrSwitchNetwork(INCENTIV_PARAMS);
  };
})();