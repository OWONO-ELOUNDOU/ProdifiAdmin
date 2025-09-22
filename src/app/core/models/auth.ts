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