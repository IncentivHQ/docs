
title: Running an Incentiv Node
created at: Sun Jan 19 2025 22:25:38 GMT+0000 (Coordinated Universal Time)
updated at: Fri Mar 21 2025 18:08:39 GMT+0000 (Coordinated Universal Time)
---

# Running an Incentiv Node

Operating a node on the Incentiv Network is essential for maintaining the blockchain’s security, decentralization, and efficiency. By running a node, users help validate transactions, store blockchain data, and support the Delegated Proof of Stake (DPoS) consensus mechanism​.

This guide provides step-by-step instructions for setting up a node using Docker Compose, an advanced manual setup, and leveraging pre-built snapshots for faster synchronization.

# A. Docker Compose Setup

Using Docker Compose is the simplest method to run a node on Incentiv. Docker automates the setup process, reducing the need for manual configurations.

```
#### 1. Prerequisites

    Before starting, ensure that Docker and Docker Compose are installed on your device. You will also need a valid Layer 1 (L1) RPC endpoint from providers like Alchemy, Infura, or other compatible services to interact with the network.

#### 2. Clone the Incentiv Deployment Repository

#### 3. Configure the Environment Variables

- Copy the example environment file and configure the required variables:

    `cp .env.example .env`

- Edit the .env file to set the following variables:
```

```javascript
        NETWORK: Set to mainnet or testnet depending on the network you want to connect to.
```

```javascript
        GETH_DATA_DIR: Specify the path where you want to store the blockchain data.
```

```javascript
        L1_RPC_URL: Your Layer 1 RPC endpoint URL (e.g., from providers like Alchemy or Infura).
```

```javascript
        L1_RPC_KIND: The type of RPC provider (alchemy, infura, etc.).
```

```javascript
        OP_NODE_L1_BEACON: Your L1 Beacon API endpoint (required for certain network upgrades).
```

```
    These variables are essential for configuring the node to connect to the appropriate network and storage locations.

#### 4. Start the Docker Containers

    With the environment variables set and Docker images built, start the containers using Docker Compose:

    `docker-compose up -d`

    This command pulls the latest versions of the pre-built Docker images and starts the necessary containers, including blast-geth and op-node. The -d flag runs the containers in detached mode, allowing them to run in the background.

#### 5. Test Your Node

To verify that your node is functioning correctly, you can query the latest Layer 2 (L2) block:
```

```javascript
    curl -d '{ \
        "id":0,
        "jsonrpc":"2.0",
        "method":"eth_getBlockByNumber",
        "params":["latest",false]
    }' -H "Content-Type: application/json" http://localhost:9545
```

```
#### 6. Monitor & Manage Containers

- To view the status of your running containers, use:

    `docker compose ps`

    This command provides a list of active containers along with their current statuses.

- If you need to stop the running containers, execute:

    `docker compose down`

    This will stop and remove all containers defined in your docker-compose.yml file.

- To update your containers to the latest versions of the images, run:

    `docker compose pull --policy=always`

    `docker compose up -d`

    These commands pull the latest images and restart the containers in detached mode, ensuring your node operates with the most recent updates.
```

# B. Advanced Setup

For developers or users who want more control over their node, building from source is an alternative method.

#### Initial Setup

```
1. Download Incentiv
1. Building the Docker Images
1. Generate the jwt secret
1. Initialize the blast-geth data directory
```

#### Running

```
1. Set up env vars
```

#### Upgrades

```
1. Using pre-built docker images
1. Building the docker images from source code
```

# C. Node Snapshot

If you want to speed up synchronization, you can use a pre-built snapshot instead of syncing from scratch.

#### 1. Download the Latest Snapshot

```
- Navigate to your data directory.

    `cd <geth_data_directory>  `

- Then, download the latest snapshot.

    **_**__**_**__**_**__**_**__**_**__**_**__**_**__**_**__**_**__
```

#### 2. Extract the Snapshot

```
    `tar -xvzf geth.tgz`
```

#### 3. Start the Node

```
- If using Docker Compose, restart the node:

    `cd ..`

    `docker compose up -d`
```

# Importance

Why Run an Incentiv Node?

* Earn INC Rewards

  ```
    Validators and node operators receive staking and delegation incentives.
  ```

* Secure the Network

  ```
    Nodes help validate transactions and maintain decentralization.
  ```

* Fast Synchronization

  ```
    incentiv’s snapshot feature reduces sync time, allowing quick participation.
  ```

* Low Barrier to Entry

  ```
    With Docker support, setup is streamlined for both novice and advanced users.
  ```

**For additional assistance, join the**[\*\* Incentiv Community\*\*](https://discord.com/invite/incentiv) **.**

<u></u>

          