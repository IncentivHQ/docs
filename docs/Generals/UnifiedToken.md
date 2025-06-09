---
title: Unified Token
---
The Unified Token System streamlines blockchain interactions by allowing users to perform transactions and pay gas fees using any supported token. By combining Account Abstraction (AA) and an integrated decentralized exchange (DEX), it removes the need to hold a native gas token like \$CENT, while maintaining security, efficiency, and decentralization.

# How It Works

<Steps>
  
<Step title="Step 1: Initiate a Transaction">

Access the Incentiv Portal and choose either the “Swap” or “Send” function. This will display your available balances and open the interface for transaction setup.

</Step>
<Step title="Step 2: Define Transaction Parameters">

- For swaps: Select the token you want to exchange and the token you wish to receive.
- For sends: Enter the recipient’s wallet address and select the token to transfer.
</Step> 
<Step title="Step 3: Specify the Token Amount"> 

Enter the amount of tokens to swap or send. The system will display the estimated output for swaps. For both actions, the estimated gas fee will be shown based on current network conditions.
</Step>
<Step title="Step 4: Select a Gas Token">

Use the dropdown menu to choose which token to use for paying gas fees.

- Only tokens with a sufficient balance to cover the projected fee will be available.
- \$CENT is selected by default if present in the wallet.
- Other supported testnet tokens include SMPL, BULL, and FLIP.
</Step>
<Step title="Step 5: Review and Confirm">

Carefully verify all transaction details:

- Token amounts
- Selected gas token
- Recipient address (for sends)

Once confirmed, authorize the transaction using your Passkey, MetaMask, or WalletConnect.
</Step>
</Steps> 
# Strategic Impact on the Network

#### Removes the Need for Native Token Holdings

Users no longer need to acquire or maintain \$CENT just to transact. This simplifies onboarding and lowers the threshold for participation, especially for users new to crypto or those interacting via dApps for the first time.

#### Enables Gas Payment Using Any Supported Token

Transactions can be processed using alternative tokens (e.g., SMPL, BULL, FLIP on testnet), with behind-the-scenes conversion to \$CENT. This flexibility improves usability and supports a more seamless experience across token ecosystems.

#### Reduces User Friction and Transaction Failure

By handling token conversion and gas logic within a single flow, the system reduces the risk of failed transactions due to insufficient gas or missing approvals, common pain points in traditional blockchain UX.

#### Increases Accessibility for dApp Ecosystems

dApps can onboard users who hold only their native token (e.g., a game token or reward asset) without requiring separate \$CENT purchases. This supports broader adoption and token-specific economies.

# Planned Future Enhancements

#### Airdrops in Any Token

Users will be able to receive rewards and airdrops in tokens they do not currently hold. This removes the need for prior approvals or token exposure, streamlining onboarding and broadening reward distribution strategies.

#### Preferred Token Mode

Users will have the ability to designate a default token for receiving all inbound transfers. This ensures consistent payout routing, regardless of the token used by the sender, and supports more flexible dApp and reward configurations.