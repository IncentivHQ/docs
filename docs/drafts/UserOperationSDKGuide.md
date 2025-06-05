
title: UserOperation SDK Guide
created at: Sun Mar 09 2025 15:48:40 GMT+0000 (Coordinated Universal Time)
updated at: Mon Mar 31 2025 16:46:04 GMT+0000 (Coordinated Universal Time)
---

# UserOperation SDK Guide

The UserOperation SDK streamlines the creation and management of smart contract wallets under the Account Abstraction (AA) framework. It enables developers to create and sign UserOperations, manage gas fees, and interact with bundlers to automate transaction batching and execution. This reduces costs and improves overall network efficiency​.

The SDK supports secure authentication using passkeys and EOAs, offering flexibility through multi-signature setups and social recovery. Its modular design allows for seamless integration with existing wallets, making it easier for developers to build more intuitive and automated blockchain applications​

The UserOperation SDK enables developers to create and send `UserOperation` objects for smart contract wallets using account abstraction. It provides an abstraction layer for:

* **UserOperation creation & signing**
* **Bundler interaction**
* **Gas estimation & optimization**
* **Transaction batching**
* **Account recovery mechanisms**
* **Multi-signature requirements**
* **Passkey & EOA-based authentication**

This package provides two APIs:

1. **Low-Level API (walletAPI)**: Offers more granular control for constructing and signing `UserOperation` objects.
2. **High-Level API (Provider API)**: A simplified approach that integrates with existing providers.

## 1. Low-Level API: `BaseWalletAPI`

The **Low-Level API** allows developers to directly create `UserOperation` objects for smart contract wallets. This is useful when implementing a custom wallet or integrating with existing smart contract wallets.

### `BaseWalletAPI`

An abstract base class for creating `UserOperation` objects.

### `SimpleAccountAPI`

A concrete implementation of `BaseWalletAPI` designed for the **SimpleWallet** sample of account abstraction.

#### Example Usage:

```javascript
// Initialize provider and wallet owner
owner = provider.getSigner();

// Create a wallet API instance
const walletAPI = new SimpleAccountAPI({
  provider,
  entryPointAddress,
  owner,
  factoryAddress,
});

// Create and sign a UserOperation
const op = await walletAPI.createSignedUserOp({
  target: recipient.address,
  data: recipient.interface.encodeFunctionData("something", ["hello"]),
});
```

## 2. High-Level API: `Provider API`

The **High-Level API** simplifies the process by using the current provider's account as the wallet owner, leveraging the `Sign Message` operation.

### Key Considerations:

* Works only for wallets that use an **EIP-191** ("Ethereum Signed Message") signature, such as the `SimpleWallet` sample.
* The UX is less optimal as users must sign a hash without seeing their wallet address.

#### Example Usage:

```javascript
import { wrapProvider } from "@account-abstraction/sdk";

// Use the current provider's signer as the wallet owner
const aaSigner = provider.getSigner();

const config = {
  chainId: await provider.getNetwork().then((net) => net.chainId),
  entryPointAddress,
  bundlerUrl: "http://localhost:3000/rpc",
  factoryAddress, // Required if factoryManagerAddress is not provided
  factoryManagerAddress, // Optional, needed if factoryAddress is missing
};

// Wrap the provider with account abstraction capabilities
const aaProvider = await wrapProvider(provider, config, aaSigner);

// Retrieve the wallet address
const walletAddress = await aaProvider.getSigner().getAddress();

// Ensure the wallet has enough balance for transactions

const myContract = new Contract(abi, aaProvider);

// Execute a method through the account abstraction EntryPoint
await myContract.someMethod();
```

## Configuration Notes

When using the **High-Level Provider API**, ensure that you provide:

* `factoryAddress`: The pre-deployed factory contract address.
* \*\*OR \*\*`factoryManagerAddress`: Used to dynamically fetch the `factoryAddress`.

> If both values are missing, an error will be thrown during initialization.

## Installation

To install the **UserOperation SDK** and its dependencies:

```javascript
npm install ui-sdk ethers@5.7.2 base64url cbor elliptic bn.js js-sha256
# or
yarn add ui-sdk ethers@5.7.2 base64url cbor elliptic bn.js js-sha256

```

#### Browser Compatibility

For **Passkey-based authentication**:

* **Chrome/Edge**: Version 67 or later
* **Safari**: Version 14 or later
* **Firefox**: Version 60 or later
* **Mobile**: iOS 15+ (Safari), Android 7+ (Chrome)

## Account Abstraction Providers

### Creating an EOA-based Account Abstraction Provider

To use an **Externally Owned Account (EOA)** like **MetaMask** with **Account Abstraction**, wrap the EOA in an **Account Abstraction provider**.

```javascript
import { ethers } from "ethers";
import { wrapProvider } from "ui-sdk";

const getAAProvider = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = provider.getSigner();

  const config = {
    chainId: await provider.getNetwork().then((net) => net.chainId),
    entryPointAddress: process.env.REACT_APP_ENTRY_POINT_ADDRESS,
    bundlerUrl: process.env.REACT_APP_BUNDLER_URL,
    factoryAddress: process.env.REACT_APP_ACCOUNT_FACTORY_ADDRESS,
    factoryManagerAddress: process.env.REACT_APP_FACTORY_MANAGER_ADDRESS,
  };

  const aaProvider = await wrapProvider(provider, config, signer);
  return aaProvider;
};
```

### Creating a Passkey-based Account Abstraction Provider

Passkeys allow users to authenticate without passwords, improving security.

#### Passkey Registration

```javascript
import base64url from "base64url";

export const registerPasskey = async (passkeyName) => {
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  const publicKeyCredentialCreationOptions = {
    publicKey: {
      challenge,
      rp: { name: "Your Wallet", id: window.location.hostname },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: passkeyName,
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
      },
      timeout: 60000,
      attestation: "direct",
    },
  };

  const credential = await navigator.credentials.create(
    publicKeyCredentialCreationOptions
  );
  return credential;
};
```

## Transaction Operations

### Single Transactions

```javascript
const sendTransaction = async (provider, to, value, data = "0x") => {
  const signer = provider.getSigner();
  const tx = {
    to,
    value: ethers.utils.parseEther(value),
    data,
  };
  const txResponse = await signer.sendTransaction(tx);
  await provider.waitForTransaction(txResponse.hash);
  return txResponse;
};
```

### Batch Transactions

```javascript
const sendBatchTransaction = async (provider, transactions) => {
  const signer = provider.getSigner();
  const batchTx = {
    targets: transactions.map((tx) => tx.to),
    values: transactions.map((tx) => tx.value),
    datas: transactions.map((tx) => tx.data || "0x"),
  };

  const txResponse = await signer.sendBatchTransaction(batchTx);
  await provider.waitForTransaction(txResponse.hash);
  return txResponse;
};
```

## Gas Management

### Gas Estimation

```javascript
const estimateGas = async (provider, to, value, data = "0x") => {
  const gasEstimate = await provider.estimateGas({ to, value, data });
  return gasEstimate.toString();
};
```

### Gas Price Management

```javascript
const getGasPrice = async (provider) => {
  const feeData = await provider.getFeeData();
  return {
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
  };
};
```

## Troubleshooting & Common Errors

| Error                            | Cause                            | Solution                                       |
| -------------------------------- | -------------------------------- | ---------------------------------------------- |
| `Invalid UserOperation (-32602)` | Malformed transaction parameters | Ensure all fields are correctly set            |
| `AA23 reverted (Out of Gas)`     | Insufficient gas                 | Increase gas limits and balance                |
| `AA24 Signature Error`           | Signature mismatch               | Use the correct key for signing                |
| `-32501 Rejected by Paymaster`   | Paymaster denial                 | Check `paymasterAndData` and paymaster deposit |

## Best Practices

* **Use Gas Estimation** – Always calculate gas before sending transactions.
* **Simulate Before Sending** – Use `eth_simulateUserOperation` for debugging.
* **Monitor Mempool** – Check if the bundler is picking up your UserOp.
* **Secure Private Keys** – Never expose private keys in frontend code.
* **Use Paymasters** – Offload gas fees for users when possible.

## Security Considerations

🔒 **Limit Trust in Mempool** – UserOperations are public, avoid exposing sensitive data.\
🔒 **Implement Time-Bound Signatures** – Prevent replay attacks by signing with expiry timestamps.\
🔒 **Restrict API Keys** – Prevent unauthorized transactions using restricted API access.\
🔒 **Monitor for Anomalies** – Detect unusual transaction patterns and failed UserOperations.

## Additional Resources

🔗 [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)\
📘 [UI-SDK Documentation](https://github.com/ui-sdk/ui-sdk-docs)\
🌍 [ERC-4337 Community Forum](https://discord.gg/erc4337)

          