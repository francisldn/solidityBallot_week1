* Structure scripts to

<h3> Deploy </h3>
```
yarn run ts-node --files ./scripts/Ballot/deployment.ts "arg1" "arg2" "arg3"
```
  * contract deployed: ``0x943d5271763e765727538AF7494309FC94C0B0DF``
  * transaction hash: ``0x3525cd809776da7fbf1da82b373d026038541f116292817686b7038dfee77d18``

<hr />

<h3> Query proposals </h3>
  * Attach ballot interface to ballot contract address
```
yarn run ts-node --files ./scripts/Ballot/queryProposals.ts "0x943d5271763e765727538AF7494309FC94C0B0DF"
```
  * Query the number of proposals, through public variable ``proposalCounter``
  * Loop through the proposals array and get proposal struct
<hr />

<h3>Give vote right passing an address as input</h3>
  * voter address: 0x3d6C691e4d0122DD96C941748a60478641756a4d
  * only Chairperson is authorised to give voting rights to another address
  * Transaction hash: ``0xb758cd2bf0df8d5612397bab3acdb396fb132f85cafab280c13949255369ec58``
```
yarn run ts-node --files ./scripts/Ballot/giveVotingRights.ts "0x943d5271763e765727538AF7494309FC94C0B0DF" "0x3d6C691e4d0122DD96C941748a60478641756a4d"
```

<hr />
<h3>Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment</h3>
  * Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment
  * Delegate my vote passing user address as input and using the wallet in environment
  * Query voting result and print to console
