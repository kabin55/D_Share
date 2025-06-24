// src/services/walletService.js
export const storeWalletInBackend = async (walletAddress) => {
  try {
    const response = await fetch('http://your-backend-api.com/api/wallet/store-wallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      throw new Error('Failed to store wallet address');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing wallet:', error);
    throw error;
  }
};

export const getWalletFromBackend = async (walletAddress) => {
  try {
    const response = await fetch(`http://your-backend-api.com/api/wallet/${walletAddress}`);
    if (!response.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};