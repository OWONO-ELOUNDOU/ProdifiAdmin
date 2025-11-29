export interface AuthUser {
    email: string;
    id: string;
    phone: string;
    role: string;
}


/**
 * Interface pour la connexion
 */

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    access: string;
    refresh: string;
    user: AuthUser;
}

/**
 * Interface pour l'utilisateur connecté
 */
export interface CurrentUser {
    id: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    is_active: boolean;
    push_token: string;
    has_wallet: boolean;
}

// KYC info
export interface KYC {
    id: string;
    user: string;
    full_name: string;
    first_name: string;
    profession: string;
    filiation: string;
    id_document_front: string;
    id_document_back: string;
    user_image: string;
    id_number: string;
    address: string;
    birth_date: string;
    nationality: string;
    average_income: number;
    investment_activities: string[];
    investment_horizon: string;
    status: string;
    verified_by: string;
    verified_at: string;
}