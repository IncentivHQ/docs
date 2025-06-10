

# Account Abstraction Basics

Account Abstraction (AA) in Incentiv streamlines transactions by automating approvals, enabling flexible gas payments, and securing user wallets. Follow these steps to seamlessly interact with the blockchain using AA wallets.

<Steps>
  <Step title="Step 1: Initiating a Transaction">

* Start by initiating a transaction request through the Incentiv Web App.
</Step>
<Step title="Step 2: Signing the Transaction"> 

* If using a third-party wallet provider like Trust or MetaMask, users must sign the transaction. This step verifies the user’s identity and intent.
</Step>
<Step title="Step 3: Generating UserOperations Payload"> 

* Once signed, the transaction generates a UserOperations payload containing all necessary details in the required format. The payload is sent to the Alt. Mempool, where it awaits bundling. Transactions are prioritized based on various factors, including fee offerings.
</Step> 
<Step title="Step 4: Bundling by Bundlers"> 

* A bundler picks up the transaction from the Alt. Mempool and wraps it into a regular blockchain transaction. The finalized transaction is then submitted to the Entry Point contract.
</Step>
<Step title="Step 5: Processing by Entry Point Contract">

* The Entry Point contract validates the transaction and forwards it to the respective user’s AA Wallet.
</Step>
<Step title="Step 6: Execution by AA Wallet">

* The user’s AA Wallet executes the transaction, whether it involves transferring funds, staking, or interacting with dApps.
</Step>
<Step title="Step 7: Fee Handling">

* After execution, the AA Wallet sends the transaction fee to the Reward Distribution contract, which manages network-wide fee allocation. In some cases, Paymasters may sponsor fees, enabling gasless transactions.
</Step>
<Step title="Step 8: Rejection of Direct Transfers">

* Any attempt to bypass this structured process and send funds directly to recipients is automatically rejected. This ensures security, compliance, and transaction integrity.
</Step>

</Steps>

          