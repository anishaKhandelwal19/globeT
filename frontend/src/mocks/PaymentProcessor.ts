import { PaymentMethodType } from "../enums/PaymentEnum";
import { PaymentResult } from "../interfaces/BookingInterface";

export class MockPaymentProcessor {
  private type: PaymentMethodType;

  constructor(type: PaymentMethodType) {
    this.type = type;
  }

  async processPayment(amount: number, paymentInfo: any): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        const transactionId = `TXN-${Math.random().toString(36).substr(2, 9)}`;
        const message = success
          ? "Payment successful."
          : "Payment failed: Insufficient funds.";
        const errorCode = success ? null : "E001";
        const result = new PaymentResult(
          success,
          transactionId,
          amount,
          "USD",
          message,
          this.type,
          errorCode
        );
        console.log(`[MockPaymentProcessor - ${this.type}] Processed payment:`, result);
        resolve(result);
      }, 1500); // Simulated delay
    });
  }

  async refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% refund success rate
        const message = success ? "Refund successful." : "Refund failed.";
        const errorCode = success ? null : "R001";
        const result = new PaymentResult(
          success,
          `REF-${transactionId}`,
          amount,
          "USD",
          message,
          this.type,
          errorCode
        );
        console.log(`[MockPaymentProcessor - ${this.type}] Processed refund:`, result);
        resolve(result);
      }, 1000);
    });
  }
}
