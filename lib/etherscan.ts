const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

export async function fetchEthGasPrice(): Promise<number> {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
    );
    const data = await response.json();
    return parseInt(data.result.SafeGasPrice);
  } catch (error) {
    console.error('Error fetching Ethereum gas price:', error);
    throw error;
  }
}