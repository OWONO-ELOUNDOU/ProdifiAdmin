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
    maturity_date?: string;
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

/**
 * Informations sur les titres d'état
 */

export const TitleTypeList = [
    { value: 'BTA', label: 'BTA' },
    { value: 'OTA', label: 'OTA' }
]

export const TitleStateList = [
    { value: 'ACTIVE', label: 'ACTIVE' },
    { value: 'DRAFT', label: 'DRAFT' },
    { value: 'MATURED', label: 'MATURED' },
    { value: 'REDEEMED', label: 'REDEEMED' },
    { value: 'ARCHIVED', label: 'ARCHIVED' }
]

export const TitleDurationWeeksList = [
    { value: 13, label: '3 mois (13 semaines)' },
    { value: 26, label: '6 mois (26 semaines)' },
    { value: 52, label: '12 mois (52 semaines)' }
]