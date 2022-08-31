export interface Account {
    email: string;
    first_name: string;
    last_name: string;
    department: string;
    school_id: string;
    image: string;
    password: string;
    role?: string;
    research_list?: string[];
    approve?: boolean;
}
