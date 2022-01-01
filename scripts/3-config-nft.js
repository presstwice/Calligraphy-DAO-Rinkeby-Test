import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x39743536bdE1e81449a67Dbd92B0cdEC3b6e0F67",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Initium Letter",
        description: "This NFT will give you access to CalligraphyDAO. You were born I, now you continue together.",
        image: readFileSync("scripts/assets/ornamental.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})() 