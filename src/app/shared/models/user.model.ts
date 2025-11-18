// Interfaces pour les clients et les sociétés de bourse.

/**
 * modèle pour les société de bourse
 */
export interface BrokerageFirm {
    id?: string;
    name: string;
    email?: string;
    password?: string;
    nui: string;
    logo?: string; // URL ou path de l'image du logo
    address: string;
    contact_info: string;
    is_active: boolean;
    is_user: boolean;
    created_at: string;
}
/**
 * modèle pour les société de bourse
 */

/**
 * Modèles pour les clients début
 */
export interface Client {
    id: string;
    email: string;
    password: string;
    role: string; // 'admin', 'user', etc.
    phone: string;
    has_wallet: boolean;
    push_token: string | null; // Token pour les notifications push
    company: string; // Nom de la société de bourse associée uniquement pour les société admin
    created_at: string;
    updated_at: string;
}
/**
 * Modèles pour les clients fin
 */

/**
 * Modèles pour les utilisateurs / clients liés à une société début
 */
export interface CompanyClient {
    email: string;
    password: string;
    phone: string;
    push_token?: string;
}
/**
 * Modèles pour les utilisateurs / clients liés à une société fin
 */