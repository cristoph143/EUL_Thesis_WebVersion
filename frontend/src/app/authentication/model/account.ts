export interface Account {
    school_id: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    password: string;
    role?: string;
    approve?: number;    
}
