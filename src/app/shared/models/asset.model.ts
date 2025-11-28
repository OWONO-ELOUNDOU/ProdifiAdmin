// Interface pour les titres d'état

/**
 * Modèles pour les titres d'état réels début
 */
export interface ReelAsset {
    id: string;
    company: string;
    title_code: string;
    name: string;
    issue_date: string;
    amount: number;
    title_type: string;
    state: string;
    bta_duration_weeks: number;
    interest_rate: number;
    maturity_date: string;
    quantity: number;
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
    id?: string;
    real_title: string; // Référence au titre réel associé
    real_title_code?: string;
    title_type?: string;  // 'BTA' | 'OTA' hérité du titre réel
    quantity: number;
    buy_price: number;
    sell_price: number;
    margin: number; // marge bénéficiaire en pourcentage ((sell - buy) / buy) * 100
    interest_rate?: number; // hérité du titre réel lecture uniquement
    maturity_date?: string; // hérité du titre réel lecture uniquement
    is_available?: boolean;
    created_at?: string;
}
/**
 * Modèles pour les titres d'état virtuels fin
 */
export interface PublicRealTitlesResponse {
    count: number;
    next: string;
    previous: string;
    results: ReelAsset[]
}
export interface PublicVirtualTitlesResponse {
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


// Interface pour les fonds de placement
export interface Fund {
    code: string;
    name: string;
    management_company: string;
    fund_type: string;
    nav_per_unit: number;
    nav_date: Date;
    expense_ratio: number;
    min_subscription_amount: number;
    risk_level: string;
    entry_fee_rate: number;
    exit_fee_rate: number;
    is_open: boolean;
    document?: File; // Document justificatif associé au fonds
    verified?: boolean;
}

// Interface pour la réponse de l'API des fonds
export interface FundResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Fund[];
}

// Interface pour les unités de fonds
export interface FundUnit {
    id: string;
    fund: Fund;
    quantity: number;
    buy_price: number;
    sell_price: number;
    is_available: boolean;
}

// Interface pour les events de fonds
export interface FundEvent {
    id: string;
    fund: Fund;
    kind: string; // 'SUBSCRIPTION' | 'REDEMPTION'
    at: Date;
    actor?: string;
    payload: any;
}


export const fundTypeList = [
    { "value": "Monétaire", "label": "MOMEY_MARKET" },
    { "value": "Obligatoire", "label": "BOND" },
    { "value": "Actions", "label": "EQUITY" },
    { "value": "Diversifié", "label": "BALANCED" },
    { "value": "Indice", "label": "INDEX" },
    { "value": "Alternatif", "label": "ALTERNATIVE" }
]

export const riskLevelList = [
    { "value": "2", "label": "LOW" },
    { "value": "1", "label": "VERY_LOW" },
    { "value": "3", "label": "MODERATE_LOW" },
    { "value": "4", "label": "MODERATE" },
    { "value": "5", "label": "MODERATE_HIGH" },
    { "value": "6", "label": "HIGH" },
    { "value": "7", "label": "VERY_HIGH" }
]