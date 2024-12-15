const hre = require("hardhat");

async function main() {
  const ResearchData = await hre.ethers.getContractFactory("ResearchData"); //fetching bytecode and ABI
  const researchData = await ResearchData.deploy(); //creating an instance of our smart contract

  await researchData.deployed();//deploying your smart contract

  console.log("Deployed contract address:",`${researchData.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0xe46723bF3e126d79b25b92B05914C8eeA26769e2 - Correct Address
//0x5FbDB2315678afecb367f032d93F642f64180aa3 - Test Address

//2c258e2017f15c9c0034077ffcf581f2344dcff3c9d868dea5eb41710fcf6c69 - Pinata Secret
//977c301d62eee094020e - Pinata API