* Structure scripts to:
  * Deploy
  * Query proposals
  * Give vote right passing an address as input
  * Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment
  * Delegate my vote passing user address as input and using the wallet in environment
  * Query voting result and print to console


<h3> Deploy </h3>

```
yarn run ts-node --files ./scripts/Ballot/deployment.ts "arg1" "arg2" "arg3"

```
  * Contract deployed: ``0xd4c89fe78c7988692017F70A347A2A3f1920E157``
  * Transaction hash: ``0xa7ea1f7d818c01b6abdccdb95c5a903d8f7a3fed08c89380ec2df64a4becb3b6``
  * Deployed contract address and transaction hash are stored in ``./registry.json`` file

<hr />

<h3> Query proposals </h3>
  * Attach ballot interface to ballot contract address

```
yarn run ts-node --files ./scripts/Ballot/queryProposals.ts "0x943d5271763e765727538AF7494309FC94C0B0DF"
```
  * Query the number of proposals, through public variable ``proposalCounter``
  * Loop through the proposals array and get proposal struct through reading ``proposals`` array
<hr />

<h3>Give voting right passing an address as input</h3>
  
  * 1st argument - voter address: ``0x4522f1b2539Cbc97d1233c9da4BAbb2B1Ee6F55B``
  * Only Chairperson (deployer address) is authorised to give voting rights to another address
  * Successfully giving voting rights to the voter address above, through ``giveRightToVote`` function
  * Transaction hash: ``0xbde35a79dfda1d0a90708fef2655e5e573f08c2f87d684162aacc4afd9d2cc85``

```
yarn run ts-node --files ./scripts/Ballot/giveVotingRights.ts "0x4522f1b2539Cbc97d1233c9da4BAbb2B1Ee6F55B"
```
<hr />

<h3>Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment</h3>

  * 1st argument - proposal index: 1 (proposal "arg2")
  * Note that if an address has voted it cannot delegate voting right (``require(!sender.voted, "You already voted.)``)
  * Execute voting using function ``vote(uint256 proposal)``
  * Successfully voted for the 1st proposal ("arg2") with index 1
  * Transaction hash: ``0x3d975a46cb1dc4fe49530fdd3c4dca2a4e8d8cb13964249a1abb8dc37274c2ae``
```
yarn run ts-node --files ./scripts/Ballot/castVote.ts "1"

```
<hr />

<h3>Delegate my vote passing user address as input and using the wallet in environment</h3>
  
  * 1st argument - delegate address: ``0x4522f1b2539Cbc97d1233c9da4BAbb2B1Ee6F55B``
  * Only address that is given voting right can be delegated voting right (``require(delegate_.weight >= 1)``)
  * If an address has voted, it cannot delegate voting right (``require(!sender.voted, "You already voted.)``)
  * An address cannot delegate voting right to itself (``require(to != msg.sender, "Self-delegation is disallowed)``)
  * Execute the delegation of voting right using function ``delegate(address to)``
  * Successfully delegated voting rights to the address above
  * Transaction hash: ``0xd53c127e71e68d88183cd116ef5fc5be500d6900db023effcd49d952c47be2b6``
```
yarn run ts-node --files ./scripts/Ballot/castVote.ts "0x4522f1b2539Cbc97d1233c9da4BAbb2B1Ee6F55B"

```
<hr />

<h3>Query voting result and print to console</h3>

  * Query winning proposal index (function ``winningProposal()``) and name (function ``winnerName()``)
  * winningProposal() returns index(type: BigNumber), converted into number 
  * winnerName returns byte32 data, converted into string using ``ethers.utils.parseBytes32String()``

```
yarn run ts-node --files ./scripts/Ballot/QueryVotingResult.ts 

```
