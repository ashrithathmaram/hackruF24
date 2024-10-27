
// Assuming the structure of the Admin model is similar to Provider but with potential differences
export interface User {
    _id?: string; // Optional because it might not be present initially
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    contact?: object; // Optional
    // Add any admin-specific fields here
}

export interface AuthState {
    user: User | null;
    token: "";
}

// Combine all slices into a single RootState interface
export interface RootState {
    auth: AuthState;
    // Add other slices as needed, e.g., for Admin
}