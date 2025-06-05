

# Transaction Finality

The Incentiv blockchain employs a Proof of Authority (PoA) consensus mechanism, enhanced by ERC-4337's Account Abstraction, to deliver deterministic and near-instant finality for transactions. This innovative combination ensures robust transaction finality while enabling seamless user operations through bundlers. Below, we explore the mechanics, features, and benefits of this approach.

## PoA Finality Mechanics

### PoA Overview

The PoA consensus protocol ensures deterministic finality through a multi-phase commit process (proposal, prepare, commit) managed by a known set of validators. Once two-thirds or more of validators sign off on a block, it is sealed and considered final. This mechanism eliminates the risk of chain reorganizations, providing “instant” finality under typical conditions.

### Core Functions

* **Quorum-Based Block Sealing**
  * Validators collectively finalize blocks by achieving the required quorum.
  * Once sealed, blocks are immutable unless more than one-third of validators act maliciously.
* **Validator Configuration and Governance**
  * Validators are authorized through on-chain governance or configuration settings.
  * Misbehaving validators can be removed to maintain the quorum threshold and ensure network stability.
* **Fault Tolerance**
  * The network can continue finalizing blocks uninterrupted as long as fewer than one-third of validators are byzantine.

## ERC-4337’s Impact on Finality

The integration of **ERC-4337** introduces **User Operations (UserOps)**, which are batched into transactions by **bundlers**. This transaction model works seamlessly with PoA, without altering its core finality properties.

**Bundling and Block Inclusion:**

* Bundlers aggregate UserOps off-chain and broadcast them as transactions to the network.
* Once included in a sealed block (validated by the PoA quorum), these transactions and all associated UserOps are considered final.

**Partial Execution Failures:**

* If certain UserOps within a bundle fail validation (e.g., due to invalid signatures or insufficient gas), those specific operations revert while the rest succeed.
* The block’s finalization is unaffected by the success or failure of individual UserOps, as PoA finalizes the entire block state once validators sign it.

### Summary of Finality with ERC-4337:

* **Deterministic Finality:** Transactions are finalized in a single production round, ensuring immutability upon block sealing.
* **User Perspective:** User operations are considered final and irreversible once they appear in a sealed block.

### Throughput and Finality Metrics

* **Transaction Throughput:** The efficient PoA mechanism and bundling (via ERC-4337) enable high throughput. Real-world TPS depends on gas limits and the complexity of on-chain operations, see more information [here](https://slite.com/api/public/notes/t4qifYh2J0vPzt/redirect) .
* **Near-Instant Finality:** PoA ensures deterministic finality within one block production round, making UserOps immutable unless validators collude beyond the byzantine threshold.

### Strategic Impact on the Network

The combination of PoA and ERC-4337 enhances the Incentiv network's security, efficiency, and user experience:

* **Deterministic Finality**\
  Transactions are finalized in a single production round, ensuring immutability upon block sealing.
* **User Perspective**\
  User operations are considered final and irreversible once they appear in a sealed block.
* **High Throughput**\
  The efficient PoA mechanism and bundling (via ERC-4337) enable high throughput. Real-world TPS depends on gas limits and the complexity of on-chain operations.
* **Instant Finality**\
  PoA ensures deterministic finality within one block production round, providing users with immediate confirmation.
* **User-Friendly Operations**\
  ERC-4337’s Account Abstraction simplifies user interactions, making blockchain operations easier and more intuitive.
* **Robust Security**\
  PoA’s quorum-based sealing and fault tolerance ensure the network’s stability and security.

          