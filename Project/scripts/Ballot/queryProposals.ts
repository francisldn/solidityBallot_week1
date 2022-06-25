import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";
import ballot from "../../registry.json";

const ballotAddress = ballot.ballotAddress;
// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY = process.env.PRIVATE_KEY;
async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(EXPOSED_KEY as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;
  // const chairpersonAddress = await ballotContract.chairperson();
  const proposals = await ballotContract.proposalCounter();
  for (let i = 0; i < proposals.toNumber(); i++) {
    const proposalDetail = await ballotContract.proposals(i);
    const encodedName = ethers.utils.parseBytes32String(proposalDetail.name);
    console.log(`Proposal ${i + 1}: ` + encodedName);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
