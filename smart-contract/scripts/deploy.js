const { ethers } = require("hardhat");

async function main() {
  // 1. Get the contract factory (compiled contract)
  const DShare = await ethers.getContractFactory("DShare");

  // 2. Deploy the contract
  console.log("Deploying DShare contract...");
  const dshare = await DShare.deploy();
  
  // 3. Wait for deployment confirmation
  await dshare.waitForDeployment();
  
  // 4. Get the contract address
  const contractAddress = await dshare.getAddress();
  console.log("DShare deployed to:", contractAddress);

  console.log(network.config);


  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for confirmations....");
    await dshare.deploymentTransaction().wait(6)
    console.log("Waiting 30 seconds for Etherscan to index the contract...");
    await new Promise(resolve => setTimeout(resolve, 30000));
    await verify(dshare.target,[])
  }
}


//verify function
async function verify(contractAddress, args) {
    console.log("Verifying contract....");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(error);
        }
    }
}

// Execute and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });