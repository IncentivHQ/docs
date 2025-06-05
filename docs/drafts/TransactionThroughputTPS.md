
title: Transaction Throughput (TPS)
created at: Sat Dec 28 2024 21:42:51 GMT+0000 (Coordinated Universal Time)
updated at: Mon Mar 31 2025 16:46:17 GMT+0000 (Coordinated Universal Time)
---

# Transaction Throughput (TPS)

The transaction throughput (TPS) on the Incentiv blockchain is shaped by the combination of **PoA consensus mechanics** and the **ERC-4337 Account Abstraction** model. By utilizing bundlers to aggregate User Operations (UserOps) into optimized transactions, Incentiv achieves higher transaction density per block, providing scalability while maintaining deterministic finality.

## Bundler-Centric Transaction Flow Under ERC-4337

In the Incentiv blockchain, UserOps are not submitted as direct transactions by Externally Owned Accounts (EOAs). Instead, **bundlers** aggregate multiple UserOps into a single transaction that interacts with the EntryPoint contract. This model introduces unique advantages and challenges for throughput:

* **Single Bundler Transaction vs. Many UserOps:**
  * A single bundler transaction can include multiple UserOps, reducing network clutter and increasing transaction density by consolidating multiple user actions into one block slot.
  * However, these transactions are more complex and resource-intensive than simple EOA transactions. A large bundler transaction can consume significant gas, potentially limiting additional transactions or bundles in the same block.
* **Gas Limits and Complexity:**
  * The primary cap on throughput is the **block gas limit**, which determines how many operations can fit in a block.
  * Each UserOp incurs additional gas overhead due to ERC-4337 logic, such as signature aggregation, account-specific validation, and advanced smart contract wallet operations.
  * Complex UserOps, such as those involving multi-sig wallets or advanced logic, can reduce effective TPS by increasing gas consumption.

## Stability and PoA Block Production

The **PoA consensus mechanism** used by Incentiv provides a predictable and stable block production rate (configurable within a 2–5 second interval). This regular cadence, combined with a known validator set, ensures consistent transaction throughput as long as bundlers operate efficiently.

* **Batching Efficacy:**
  * The efficiency of bundlers in packing UserOps without wasting gas significantly affects TPS.
  * Under optimal conditions—lightweight UserOps, minimal state requirements, and efficient bundler implementation—Incentiv can achieve high throughput by consolidating many UserOps into each bundle.
  * Complex wallet logic or high gas consumption per UserOp can reduce the practical TPS.
* **Configurator Levers:**
  * **Block Gas Limit:** Adjusting the block gas limit can increase the number of UserOps processed per block, albeit with potential trade-offs like larger block sizes, higher validator resource usage, and longer block propagation times.
  * **Block Interval:** Reducing the block interval increases the number of blocks produced per minute, potentially raising TPS if each block is fully utilized. However, shorter intervals require robust network infrastructure to handle validator communication efficiently.

## Strategic Impact on the Network

The combination of PoA consensus and ERC-4337 bundling offers several key benefits for the Incentiv ecosystem:

* High Throughput: By aggregating UserOps into optimized transactions, Incentiv achieves higher transaction density per block, enabling high TPS.
* Deterministic Finality: PoA ensures that transactions are finalized almost instantly, providing users with immediate confirmation.
* Scalability: The bundler-centric model allows the network to scale efficiently, accommodating a growing number of users and transactions.
* User-Friendly Operations: ERC-4337’s Account Abstraction simplifies user interactions, making the blockchain more accessible.

The Incentiv blockchain leverages the PoA consensus mechanism and ERC-4337 Account Abstraction to deliver high transaction throughput while maintaining deterministic finality and scalability. By utilizing bundlers to aggregate UserOps into optimized transactions, Incentiv achieves a balance between efficiency, security, and user-friendliness. As the ecosystem continues to grow, Incentiv remains committed to enhancing its transaction processing capabilities, ensuring a seamless and high-performance blockchain experience for all users.

By leveraging the ERC-4337 bundling model and a highly stable PoA consensus, Incentiv balances scalability and usability while providing a predictable transaction throughput experience.

          