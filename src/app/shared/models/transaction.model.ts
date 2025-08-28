/**
 * Interface pour les transactions
 */
export interface Transaction {
    id: string;
    user: string;
    amount: number;
    fees: number;
    payment_method: string;
    status: string;
    type: string;
    external_phone: string;
    transaction_reference: string;
    external_transaction_id: string;
    created_at: string;
    updated_at: string;
}