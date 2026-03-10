/**
 * Payment Configuration
 * Owner: Replace placeholder addresses with real wallet addresses before going live.
 */
const PAYMENT_CONFIG = {
  // Contact info for manual verification
  contact: {
    email: 'your-email@example.com',
    telegram: 'your_telegram', // without @
  },

  // Products
  products: {
    single: {
      name: 'Single Image + Prompt / 单张图片+提示词',
      price: 4.99,
      desc: '1 high-res diorama image with full prompt',
    },
    university: {
      name: 'University Pack (5 Images) / 大学套装(5张)',
      price: 19.99,
      desc: '5 university diorama images with prompts',
    },
    collection: {
      name: 'Full Collection / 完整合集',
      price: 49.99,
      desc: 'All current diorama images with prompts',
    },
    premium: {
      name: 'Premium (All + Updates) / 高级版(含未来更新)',
      price: 79.99,
      desc: 'All images, prompts, and future updates',
    },
  },

  // Wallet addresses - REPLACE THESE WITH REAL ADDRESSES
  wallets: {
    'binance': {
      address: 'XXXXXXXXX', // Binance Pay ID
      label: 'Binance Pay ID',
      network: 'Binance Pay',
      note: 'Open Binance App -> Scan QR or search Pay ID / 打开币安App -> 扫码或搜索Pay ID',
      currency: 'USDT',
    },
    'usdt-trc20': {
      address: 'TxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX',
      label: 'USDT (TRC20)',
      network: 'TRON (TRC20)',
      note: 'Send only USDT on TRC20 network. Low fees (~$1). / 仅通过TRC20网络发送USDT，手续费低(~$1)',
      currency: 'USDT',
    },
    'usdt-erc20': {
      address: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      label: 'USDT (ERC20)',
      network: 'Ethereum (ERC20)',
      note: 'Higher gas fees. TRC20 recommended for lower cost. / Gas费较高，建议使用TRC20以降低手续费',
      currency: 'USDT',
    },
    'btc': {
      address: 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      label: 'Bitcoin (BTC)',
      network: 'Bitcoin',
      note: 'Native Bitcoin address (Bech32). / 原生比特币地址',
      currency: 'BTC',
    },
    'eth': {
      address: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      label: 'Ethereum (ETH)',
      network: 'Ethereum',
      note: 'Send ETH equivalent of the USDT amount. / 发送等值USDT金额的ETH',
      currency: 'ETH',
    },
  },

  // Payment window in seconds (30 minutes)
  paymentWindowSeconds: 30 * 60,
};
