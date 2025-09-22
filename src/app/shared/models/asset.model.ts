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
    title_code?: string;
    name: string;
    issue_date?: string;
    amount: number;
    title_type: string;
    state: string;
    bta_duration_weeks: number;
    interest_rate: number;
    maturity_date: string;
    quantity: number;
    is_primary?: boolean;
}
/**
 * Modèles pour les titres d'état virtuels fin
 */


export interface PublicTitlesResponse {
    count: number;
    next: string;
    previous: string;
    results: VirtualAsset[]
}