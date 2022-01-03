import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
  "0x448fE7C57d384675157E7Fa56763F57a0468b2aA",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule("0x7DE29cEB0589D5e700C29BA54A95cF4261df9597",
);

(async () => {
  try {
    // Give our treasury the power to mint addtional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "✅ Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module persmission ontoken module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token, balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(process.env.W_Address
    );

    // Grab 50% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent50 = ownedAmount.div(100).mul(50);

    // Transfer 50% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent50
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("Failed to transfer tokens to vote module", err);
  }
})();

