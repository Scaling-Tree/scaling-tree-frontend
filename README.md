# Scaling Tree

<p align="center">
  <img src="https://scalingtree.0xwa.run/_next/image?url=%2Fimages%2Flogo_scaling_tree.png&w=640&q=75" width="200" alt="Scaling tree logo" />
</p>


## Getting Started

First, run the development server:

```bash
# build graph client
npm run build:graph
# run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About scaling tree
One repository for the world tree data. Social media for the earth.

### What this project offers ?
1. Tree listing - Anyone can list an NFT by minting new NFT or adding an existing NFT. He/she inputs the number of trees regarding the minted NFT and uploads the tree picture. The minted NFT binds with his/her trees, which will represent how much he/she contributes in this space. The NFT owner can transfer (or sell in the marketplace in the future) when someone (or some organization) wants to boost their contribution score without planting trees by themselves.
2. Tree auditing - While anyone can post and input any number of trees in the platform, there should be some way to screen those data. This platform introduces tree audit system, where auditors (people or organizations who get voted by DAO) can validate trees in the physical area. They can stamp the audit report with the real number of trees. The audit records are stored permanently. People can filter only audited data to see the real progress of the world.
3 Tree feed - The feed page that keeps reporting all activities related to trees. The activities including tree listing/delisting, tree auditing, and tree transferring are displayed and updated in this page. Hence, everyone in the world knows what's going on and decides to contribute more.
4. Leaderboard - The page that announces the top contributors (sorted by number of trees). This page broadcasts the contribution power of individual and organization in helping the world.
5. Chat - The platform offers a chat channel that people can talk each other.
6. Profile - People can setup display name and profile image. Individual contribution will be displayed in this page.

### What's benefit of doing this ?
1. We'll have a database for tree in the world with ownership data, which can support the next item
2. There is an opportunity to trade tree on chain and off chain
3. This can help people to checkup the world status about trees
4. So that people can contribute to save the world by paying someone to plant trees for them. They get ownership upon that tree.
5. Any further utilization upon tree ownership data (e.g., carbon credit, ESG policy, etc.) can be leveraged from this global database

### Core visions
1. We build this platform to be fully decentralized. Meaning that there will not be a central authority controls this platform. Everyone in the world owns this platform together.
2. This platform is aimed to be maintained by public. All participants should get benefits from using the platform. Moreover, any fees accumulated in this platform helps it to further live. (Any cost for maintaining this platform is stored in the platform treasury and can be used to pay any service fees by DAO).
3. Having a single global database for trees is crucial. Once we get there, we can be more active to contribute to the world since we know what's going on in real time.

If you can plant trees, please plant more.
If you can't plant trees, pay to someone who can help you doing it.

Let's save the world together ! 

### How it’s made

#### Main tools
1. Figma for UX/UI design
2. Next.js for frontend development
3. Solidity and hardhat for smart contract development
4. The graph for blockchain data indexing

#### Spensor tools
1. This project is deployed to Gnosis chain, Polygon skEVM, and Optimism.
2. It uses the graph to index data
3. Use polybase for profile system
4. Use apecoin for DAO
5. Use push protocol for chat system

### Smart contracts
There are 4 completed smart contracts (and 2 upcoming contracts) in this project:
1. TreeNFT - The NFT represents tree ownership. User can mint NFT using this smart contract. Please note that this project can plug in with existing tree NFT projects, such as, Coorest, NFTrees, etc. User can add those NFTs to this project.
2. TreeDAO - The DAO Smart contract for executing DAO transactions, such as, adding and removing tree auditors
3. TreeAuditorRegistry - The contract for storing list of tree auditors. DAO will vote for adding or removing auditors in this contract.
4. TreeController - The main smart contract that keeps track of tree ownership. People can add, mint, audit, withdraw, and transfer NFT using this contract.
5. TreeMarketplace (future work) - The marketplace for trading TreeNFT.
6. TreeDAOTreasury (future work) - The smart contract for keeping DAO treasury that will be used for all expenses to maintain the system.

### Subgraph
The smart contract data is indexed using subgraph. We deployed it using subgraph studio. 

Subgraph URL:
[https://api.studio.thegraph.com/query/44385/scaling-tree/v0.0.22](https://api.studio.thegraph.com/query/44385/scaling-tree/v0.0.22)

### Repositories

Here is the list of repositories:

Frontend - [https://github.com/Scaling-Tree/scaling-tree-frontend](https://github.com/Scaling-Tree/scaling-tree-frontend)

Smart contract - [https://github.com/Scaling-Tree/scaling-tree-contract](https://github.com/Scaling-Tree/scaling-tree-contract)

Subgraph - [https://github.com/Scaling-Tree/scaling-tree-subgraph](https://github.com/Scaling-Tree/scaling-tree-subgraph)