import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working. 
if (!process.env.P_Key || process.env.P_Key == "") {
  console.log("Private key not found.")
}

if (!process.env.CalDAO_Rinkeby || process.env.CalDAO_Rinkeby == "") {
  console.log("Alchemy API URL not found.")
}

if (!process.env.W_Address || process.env.W_Address == "") {
  console.log("Wallet Address not found.")
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit the file to github.
    process.env.P_Key,
    // RPC URL, we'll use our Alchemy API URL from your .env file.
    ethers.getDefaultProvider(process.env.CalDAO_Rinkeby),
  ),
);

(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address is:", apps[0].address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})()

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts 
export default sdk;

