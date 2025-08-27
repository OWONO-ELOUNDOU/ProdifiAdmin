// Interface pour les titres d'état

/**
 * Modèles pour les titres d'état réels début
 */
export interface ReelAsset {
    id: string;
    company: string;
    title_code: string;
    name: string;
    amount: number;
    interest_rate: number;
    maturity_date: string;
    quanity: number;
    document: File; // Document justificatif associé à l'actif
    verified: boolean;
    verified_by: string | null;
    is_primary: boolean;
    created_at: string;
}
/**
 * Modèles pour les titres d'état réels fin
*/

/**
 * Modèles pour les titres d'état virtuels début
 */
export interface VirtualAsset {
    // Instance d'un titre d'état réel
    // real_asset: ReelAsset;
    id: string;
    name: string;
    quantity: number;
    buy_price: number;
    sell_price: number;
    interest_rate: number;
    maturity_date: string;
    margin: number;
    is_available: boolean;
    created_at: string;
}
/**
 * Modèles pour les titres d'état virtuels fin
 */