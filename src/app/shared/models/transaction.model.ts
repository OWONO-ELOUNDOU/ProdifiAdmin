/**
 * Interface pour les transactions
 */
export interface Transaction {
    id: string;
    user_id: string;
    asset_kind: string;
    side: string;
    payment_method: string;
    amount: number;
    state: string;
    payment_state: string;
    gross_amount: number;
    net_amount: number;
    fee_snapshot: number;
    payment_ref: string;
    expires_at: string;
    settled_at: string;
    created_at: string;
    updated_at: string;
    meta: string;
    /*
    type: string;
    external_phone: string;
    transaction_reference: string;
    external_transaction_id: string;
    */
}

export interface TransactionList {
    id: string;
    side: string;
    asset_kind: string;
    state: string;
    net_amount: number;
    created_at: string;
}

export interface TransactionListResponse {
    count: number;
    next: string;
    previous: string;
    results: Transaction[]
}

export interface TransactionAction {
    payment_ref: string;
    soruce: string;
    reason: string;
    nav_at_exec: number;
}