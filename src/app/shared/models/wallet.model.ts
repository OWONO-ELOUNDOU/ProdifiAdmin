/**
 * Interface représentant les models de portefeuille.
 */

export interface WalletSummary {
    wallet_id: number;
    currency: string;
    balance: string;
    is_locked: boolean;
    user_id: number;
    kyc_ok: boolean;
}

// interface pour les transactions de retraits
export interface Withdrawals {
    id: number;
    kind: string;
    amount: number;
    balance_after: number;
    currency: string;
    external_ref: string;
    tx_id: string;
    idempotency_key: string;
    metadata: string;
    created_at: string;
}

export interface WithdrawalRequest {
    amount: number;
    channel: string;
    note: string;
}

export interface WithdrawalRequestResponse {
    id: number;
    amount: number;
    channel: string;
    status: string;
    payout_ref: string;
    note: string;
    requested_at: string;
    decided_at: string;
    decided_by_id: string;
}

export interface WithdrawalsHistoryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Withdrawals[];
}


// interface pour les transactions de recharges
export interface Topups {
    id: string;
    wallet: number;
    amount: number;
    currency: string;
    tranzak_request_id: string;
    mch_transaction_ref: string;
    status: string;
    mobile_wallet_number: string;
    metadata: string;
    created_at: string;
    updated_at: string;
    decided_at: string;
    decided_by: string;
}

export interface TopupRequest {
    mobile_wallet_number: string;
    amount: number;
    description: string;
    payer_note: string;
}

export interface TopupRequestResponse {
    id: string;
    wallet: number;
    amount: number;
    currency: string;
    tranzak_request_id: string;
    mch_transaction_ref: string;
    status: string;
    mobile_wallet_number: string;
    metadata: string;
    created_at: string;
    updated_at: string;
    decided_at: string;
    decided_by: string;
}