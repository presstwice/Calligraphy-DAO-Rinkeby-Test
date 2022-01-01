import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x7B7E22E539c14747358c562A240a41771970376d");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "CalligraphyDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "STORY",
    });
    console.log ("✅ Successfully deployed token module, addresss", tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();