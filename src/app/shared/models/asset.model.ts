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
    min_subscription: number;
    risk_level: string;
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
    { "value": "MOMEY_MARKET", "label": "MOMEY_MARKET" },
    { "value": "BOND", "label": "BOND" },
    { "value": "EQUITY", "label": "EQUITY" },
    { "value": "BALANCED", "label": "BALANCED" },
    { "value": "INDEX", "label": "INDEX" },
    { "value": "ALTERNATIVE", "label": "ALTERNATIVE" }
]

export const riskLevelList = [
    { "value": "LOW", "label": "LOW" },
    { "value": "VERY_LOW", "label": "VERY_LOW" },
    { "value": "MODERATE_LOW", "label": "MODERATE_LOW" },
    { "value": "MODERATE", "label": "MODERATE" },
    { "value": "MODERATE_HIGH", "label": "MODERATE_HIGH" },
    { "value": "HIGH", "label": "HIGH" },
    { "value": "VERY_HIGH", "label": "VERY_HIGH" }
]