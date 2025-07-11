export const PaymentMethodType = {
  CARD: "Card",
  UPI: "UPI",
  WALLET: "Wallet"
} as const;

export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];
